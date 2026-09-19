import React from "react";
import { ShowsProvider, useShows } from "./ShowsContext";
import { WatchlistProvider, useWatchlist } from "./WatchlistContext";
import { ModalProvider, useModal } from "./ModalContext";

export { useShows } from "./ShowsContext";
export { useWatchlist } from "./WatchlistContext";
export { useModal } from "./ModalContext";

/**
 * Composite Provider (Facade)
 * Combines segregated providers for clean dependency injection and backward compatibility.
 */
export function MovieProvider({ children }) {
  return (
    <ShowsProvider>
      <WatchlistProvider>
        <ModalProvider>{children}</ModalProvider>
      </WatchlistProvider>
    </ShowsProvider>
  );
}

/**
 * Composite Hook (Facade)
 * Merges segregated contexts for backward compatibility with existing code.
 */
export function useMovieContext() {
  const shows = useShows();
  const watchlist = useWatchlist();
  const modal = useModal();

  return {
    ...shows,
    ...watchlist,
    ...modal,
  };
}
