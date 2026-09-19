import React from "react";
import { useMovieContext } from "../context/MovieContext";
import {
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
  Sparkles,
} from "lucide-react";

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
  } = useMovieContext();

  const handleClear = () => {
    setSearchQuery("");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All");
    setSortBy("featured");
    setStatusFilter("All");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedGenre !== "All" ||
    sortBy !== "featured" ||
    statusFilter !== "All";

  return (
    <div className="space-y-6">
      {/* Search Input Box */}
      <div className="relative max-w-3xl mx-auto">
        <div className="relative flex items-center group">
          <div className="absolute left-4.5 pointer-events-none text-slate-400 group-focus-within:text-indigo-400 transition-colors">
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <input
            id="movie-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title (e.g. Breaking Bad, Girls, Batman, Stranger Things)..."
            className="w-full pl-13 pr-24 py-4 sm:py-5 rounded-2xl bg-[#0f172a]/95 border-2 border-slate-700/80 hover:border-slate-600 focus:border-indigo-500 text-white placeholder-slate-400 text-sm sm:text-base font-medium shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all backdrop-blur-xl"
          />

          {/* Right Action Icons: Spinner or Clear */}
          <div className="absolute right-4 flex items-center gap-2">
            {isSearching && (
              <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            )}

            {searchQuery && !isSearching && (
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Sorting Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        {/* Left: Genre Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1">
            <Filter className="w-3.5 h-3.5 text-indigo-400" /> Genre:
          </span>
          <div className="flex items-center gap-1.5 flex-nowrap">
            {availableGenres.slice(0, 10).map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedGenre === genre
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Sort and Status Dropdowns */}
        <div className="flex items-center gap-2.5 shrink-0 justify-end">
          {/* Status Select */}
          <div className="flex items-center gap-1.5">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Running">Running</option>
              <option value="Ended">Ended</option>
              <option value="To Be Determined">Upcoming</option>
            </select>
          </div>

          {/* Sort Select */}
          <div className="flex items-center gap-1.5">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="rating-desc">Rating: Highest First</option>
              <option value="rating-asc">Rating: Lowest First</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="year-asc">Year: Oldest First</option>
              <option value="name-asc">Title: A to Z</option>
              <option value="name-desc">Title: Z to A</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors shrink-0"
              title="Reset all filters"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Active Search & Results Count Status Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div className="flex items-center gap-2 font-medium">
          {searchQuery.trim() ? (
            <span>
              Search results for{" "}
              <strong className="text-white">"{searchQuery}"</strong>
            </span>
          ) : (
            <span>Showing curated shows from TVMaze</span>
          )}
          {selectedGenre !== "All" && (
            <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">
              {selectedGenre}
            </span>
          )}
        </div>

        <div className="font-semibold text-slate-300">
          Showing{" "}
          <span className="text-indigo-400 font-bold">
            {displayedShows.length}
          </span>{" "}
          titles
        </div>
      </div>
    </div>
  );
}
