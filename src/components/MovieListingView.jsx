import React from "react";
import { useMovieContext } from "../context/MovieContext";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";
import { Film, RefreshCw, AlertCircle, Sparkles, Compass } from "lucide-react";

export default function MovieListingView() {
  const {
    displayedShows,
    loading,
    loadingMore,
    hasMore,
    loadMoreShows,
    error,
    searchQuery,
    setSearchQuery,
  } = useMovieContext();

  const handleSuggestionClick = (query) => {
    setSearchQuery(query);
  };

  return (
    <section
      id="movie-listing-section"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"
    >
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-bold text-indigo-400">
          <Compass className="w-3.5 h-3.5" />
          <span>GLOBAL DIRECTORY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Explore Movie & TV Show Catalog
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Find your next binge-worthy show. Search titles, filter by genre, or
          sort by rating.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <SearchBar />

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-xs font-bold text-rose-200 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Movie Grid / Loading Skeletons / Empty States */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-3 space-y-3 animate-pulse"
            >
              <div className="aspect-[2/3] bg-slate-800 rounded-xl w-full" />
              <div className="h-4 bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-800/60 rounded w-1/2" />
              <div className="h-8 bg-slate-800/80 rounded-xl mt-4" />
            </div>
          ))}
        </div>
      ) : displayedShows.length > 0 ? (
        <>
          {/* Responsive Movie Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayedShows.map((show) => (
              <MovieCard key={show.id} show={show} />
            ))}
          </div>

          {/* Load More Button (for all shows browsing without active search) */}
          {!searchQuery.trim() && hasMore && (
            <div className="pt-10 text-center">
              <button
                onClick={loadMoreShows}
                disabled={loadingMore}
                className="px-8 py-3.5 rounded-2xl bg-slate-800 hover:bg-indigo-600 disabled:bg-slate-900 text-white font-bold text-sm border border-slate-700 hover:border-indigo-500 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2.5"
              >
                {loadingMore ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                    <span>Loading more titles...</span>
                  </>
                ) : (
                  <>
                    <Film className="w-4 h-4 text-indigo-400" />
                    <span>Load More Shows</span>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty Search State */
        <div className="py-20 text-center max-w-lg mx-auto space-y-5">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 shadow-xl">
            <Film className="w-10 h-10 stroke-1" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">No shows found</h3>
            <p className="text-sm text-slate-400 mt-2">
              We couldn't find any titles matching your search criteria. Try a
              different title or select another genre.
            </p>
          </div>

          {/* Quick Search Suggestions */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Popular searches
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                "Breaking Bad",
                "Game of Thrones",
                "Stranger Things",
                "Chernobyl",
                "Sherlock",
                "Friends",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => handleSuggestionClick(term)}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
