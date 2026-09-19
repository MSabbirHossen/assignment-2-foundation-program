import React, { createContext, useContext } from "react";
import { useWatchlistState } from "../hooks/useWatchlist";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const watchlist = useWatchlistState();

  return (
    <WatchlistContext.Provider value={watchlist}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
}
