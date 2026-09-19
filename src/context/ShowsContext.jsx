import React, { createContext, useContext } from "react";
import { useShowsState } from "../hooks/useShows";
import { useShowFiltersState } from "../hooks/useShowFilters";

const ShowsContext = createContext(null);

export function ShowsProvider({ children }) {
  const showsState = useShowsState();
  const filtersState = useShowFiltersState(showsState.allShows);

  const value = {
    ...showsState,
    ...filtersState,
  };

  return (
    <ShowsContext.Provider value={value}>{children}</ShowsContext.Provider>
  );
}

export function useShows() {
  const context = useContext(ShowsContext);
  if (!context) {
    throw new Error("useShows must be used within a ShowsProvider");
  }
  return context;
}
