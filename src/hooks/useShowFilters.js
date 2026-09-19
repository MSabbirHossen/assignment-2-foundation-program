import { useState, useEffect, useMemo } from "react";
import { searchShows } from "../services/tvmazeApi";
import { filterShows, extractGenres } from "../utils/filtering";
import { sortShows } from "../utils/sorting";

/**
 * Custom Hook for Search, Filter, and Sort (Single Responsibility & OCP)
 */
export function useShowFiltersState(allShows) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [statusFilter, setStatusFilter] = useState("All");

  // Handle Search Debounce
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
        console.error("[useShowFiltersState] Search failed:", err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Extract available genres
  const availableGenres = useMemo(() => extractGenres(allShows), [allShows]);

  // Compute filtered and sorted shows
  const displayedShows = useMemo(() => {
    const sourceList = searchQuery.trim() ? searchResults : allShows;
    const filtered = filterShows(sourceList, {
      genre: selectedGenre,
      status: statusFilter,
    });
    return sortShows(filtered, sortBy);
  }, [allShows, searchResults, searchQuery, selectedGenre, statusFilter, sortBy]);

  // Top Rated Shows (8.0+ rating with poster)
  const topRatedShows = useMemo(() => {
    return [...allShows]
      .filter((s) => (s.rating?.average || 0) >= 8.0 && s.image?.original)
      .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
      .slice(0, 10);
  }, [allShows]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All");
    setSortBy("featured");
    setStatusFilter("All");
  };

  return {
    searchQuery,
    setSearchQuery,
    isSearching,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    statusFilter,
    setStatusFilter,
    availableGenres,
    displayedShows,
    topRatedShows,
    resetFilters,
  };
}
