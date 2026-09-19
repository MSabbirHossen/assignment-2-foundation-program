import { useState, useEffect, useCallback } from "react";
import { fetchShows } from "../services/tvmazeApi";

/**
 * Custom Hook for Fetching & Loading Shows (Single Responsibility Principle)
 */
export function useShowsState() {
  const [allShows, setAllShows] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  // Initial load
  useEffect(() => {
    let isMounted = true;
    async function loadInitial() {
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

    loadInitial();
    return () => {
      isMounted = false;
    };
  }, []);

  // Load next batch from API
  const loadMoreShows = useCallback(async () => {
    if (loadingMore || !hasMore) return;
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
      console.error("[useShowsState] Error loading more shows:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page]);

  return {
    allShows,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMoreShows,
  };
}
