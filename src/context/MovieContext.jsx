import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  fetchShows,
  searchShows,
  fetchShowDetails,
} from "../services/tvmazeApi";

const MovieContext = createContext(null);

const FAVORITES_STORAGE_KEY = "movie_explorer_favorites";

export function MovieProvider({ children }) {
  const [allShows, setAllShows] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  // Active view tab ('home', 'explore', 'favorites')
  const [activeTab, setActiveTab] = useState("home");

  // Modal State
  const [selectedShow, setSelectedShow] = useState(null);
  const [modalDetails, setModalDetails] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Favorites / Watchlist State
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error("Failed to save favorites to localStorage:", err);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((show) => {
    if (!show || !show.id) return;
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === show.id);
      if (exists) {
        return prev.filter((item) => item.id !== show.id);
      } else {
        return [show, ...prev];
      }
    });
  }, []);

  const isFavorite = useCallback(
    (showId) => {
      return favorites.some((item) => item.id === showId);
    },
    [favorites],
  );

  // Initial fetch of shows
  useEffect(() => {
    let isMounted = true;
    async function loadInitialShows() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchShows(0);
        if (isMounted) {
          setAllShows(data);
          setPage(0);
          setHasMore(data.length > 0);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.message ||
              "Failed to load movies. Please check your connection.",
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadInitialShows();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Search with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const results = await searchShows(searchQuery);
        setSearchResults(results);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load More Shows (Infinite scroll / pagination)
  const loadMoreShows = useCallback(async () => {
    if (loadingMore || !hasMore || searchQuery.trim()) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const data = await fetchShows(nextPage);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setAllShows((prev) => {
          const existingIds = new Set(prev.map((s) => s.id));
          const uniqueNew = data.filter((s) => !existingIds.has(s.id));
          return [...prev, ...uniqueNew];
        });
        setPage(nextPage);
      }
    } catch (err) {
      console.error("Error loading more shows:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page, searchQuery]);

  // Modal Handlers
  const openModal = useCallback(async (show) => {
    setSelectedShow(show);
    setModalDetails(show);
    setModalLoading(true);
    try {
      const fullData = await fetchShowDetails(show.id);
      setModalDetails(fullData);
    } catch (err) {
      console.error("Failed to fetch modal details:", err);
      // Fallback to basic show data already set
    } finally {
      setModalLoading(false);
    }
  }, []);

  const closeModal = useCallback(() => {
    setSelectedShow(null);
    setModalDetails(null);
  }, []);

  // Dynamic Genres extracted from current shows
  const availableGenres = useMemo(() => {
    const genreSet = new Set();
    allShows.forEach((show) => {
      if (Array.isArray(show.genres)) {
        show.genres.forEach((g) => genreSet.add(g));
      }
    });
    const standardGenres = [
      "Drama",
      "Action",
      "Comedy",
      "Science-Fiction",
      "Thriller",
      "Crime",
      "Adventure",
      "Fantasy",
      "Horror",
      "Mystery",
      "Romance",
      "Anime",
      "Supernatural",
    ];
    standardGenres.forEach((g) => genreSet.add(g));
    return ["All", ...Array.from(genreSet).sort()];
  }, [allShows]);

  // Process and filter shows based on search, genre, status, and sorting
  const displayedShows = useMemo(() => {
    let list = searchQuery.trim() ? searchResults : allShows;

    // Filter by Genre
    if (selectedGenre !== "All") {
      list = list.filter(
        (show) =>
          Array.isArray(show.genres) && show.genres.includes(selectedGenre),
      );
    }

    // Filter by Status (Running, Ended, etc.)
    if (statusFilter !== "All") {
      list = list.filter((show) => show.status === statusFilter);
    }

    // Sort
    const sorted = [...list];
    switch (sortBy) {
      case "rating-desc":
        sorted.sort(
          (a, b) => (b.rating?.average || 0) - (a.rating?.average || 0),
        );
        break;
      case "rating-asc":
        sorted.sort(
          (a, b) => (a.rating?.average || 0) - (b.rating?.average || 0),
        );
        break;
      case "name-asc":
        sorted.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "name-desc":
        sorted.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      case "year-desc":
        sorted.sort((a, b) =>
          (b.premiered || "").localeCompare(a.premiered || ""),
        );
        break;
      case "year-asc":
        sorted.sort((a, b) =>
          (a.premiered || "").localeCompare(b.premiered || ""),
        );
        break;
      case "featured":
      default:
        // Keep natural ordering or search relevance score
        if (searchQuery.trim()) {
          sorted.sort((a, b) => (b.searchScore || 0) - (a.searchScore || 0));
        }
        break;
    }

    return sorted;
  }, [
    allShows,
    searchResults,
    searchQuery,
    selectedGenre,
    statusFilter,
    sortBy,
  ]);

  // Top rated / Featured shows for Hero and Highlights
  const topRatedShows = useMemo(() => {
    return [...allShows]
      .filter((s) => (s.rating?.average || 0) >= 8.0 && s.image?.original)
      .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
      .slice(0, 10);
  }, [allShows]);

  const value = {
    allShows,
    displayedShows,
    topRatedShows,
    searchQuery,
    setSearchQuery,
    isSearching,
    selectedGenre,
    setSelectedGenre,
    availableGenres,
    sortBy,
    setSortBy,
    statusFilter,
    setStatusFilter,
    loading,
    loadingMore,
    hasMore,
    loadMoreShows,
    error,
    activeTab,
    setActiveTab,
    selectedShow,
    modalDetails,
    modalLoading,
    openModal,
    closeModal,
    favorites,
    toggleFavorite,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
}
