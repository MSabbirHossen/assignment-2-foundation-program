import React from "react";
import { useShows } from "../context/ShowsContext";
import SearchInput from "./search/SearchInput";
import GenreFilterChips from "./search/GenreFilterChips";
import FilterDropdowns from "./search/FilterDropdowns";

/**
 * Search and Filtering Coordinator (Single Responsibility Principle)
 */
export default function SearchBar() {
  const {
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
    displayedShows,
    resetFilters,
  } = useShows();

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedGenre !== "All" ||
    sortBy !== "featured" ||
    statusFilter !== "All";

  return (
    <div className="space-y-6">
      {/* Search Input Box */}
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery("")}
        isSearching={isSearching}
      />

      {/* Filter and Sorting Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
        {/* Genre Filter Chips */}
        <GenreFilterChips
          genres={availableGenres}
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />

        {/* Status and Sort Dropdowns */}
        <FilterDropdowns
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          hasActiveFilters={hasActiveFilters}
          onReset={resetFilters}
        />
      </div>

      {/* Results Status Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div className="flex items-center gap-2 font-medium">
          {searchQuery.trim() ? (
            <span>
              Search results for{" "}
              <strong className="text-[#00171f]">"{searchQuery}"</strong>
            </span>
          ) : (
            <span>Showing curated shows from TVMaze</span>
          )}
          {selectedGenre !== "All" && (
            <span className="px-2 py-0.5 rounded bg-[#007ea7]/10 text-[#007ea7] border border-[#007ea7]/25 font-semibold">
              {selectedGenre}
            </span>
          )}
        </div>

        <div className="font-semibold text-slate-700">
          Showing{" "}
          <span className="text-[#007ea7] font-bold">
            {displayedShows.length}
          </span>{" "}
          titles
        </div>
      </div>
    </div>
  );
}
