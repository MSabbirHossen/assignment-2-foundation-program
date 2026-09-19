import { useState, useEffect, useCallback } from "react";
import { storageService } from "../services/storageService";

const FAVORITES_STORAGE_KEY = "movie_explorer_favorites";

/**
 * Custom Hook for Watchlist Management (Single Responsibility Principle)
 */
export function useWatchlistState() {
  const [favorites, setFavorites] = useState(() =>
    storageService.getItem(FAVORITES_STORAGE_KEY, []),
  );

  useEffect(() => {
    storageService.setItem(FAVORITES_STORAGE_KEY, favorites);
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
    (showId) => favorites.some((item) => item.id === showId),
    [favorites],
  );

  const clearWatchlist = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearWatchlist,
  };
}
