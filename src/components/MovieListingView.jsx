import React from "react";
import { useMovieContext } from "../context/MovieContext";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";
import { Film, RefreshCw, AlertCircle, Compass } from "lucide-react";

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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#007ea7]/10 border border-[#007ea7]/25 text-xs font-bold text-[#007ea7]">
          <Compass className="w-3.5 h-3.5" />
          <span>GLOBAL DIRECTORY</span>
        </div>
        <h2 className="font-almendra text-3xl sm:text-4xl md:text-5xl font-bold text-[#00171f] tracking-wide">
          Explore Movie & TV Show Catalog
        </h2>
        <p className="font-architects text-[#003459]/80 text-base sm:text-lg">
          Find your next binge-worthy show. Search titles, filter by genre, or
          sort by rating.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <SearchBar />

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-xs font-bold text-rose-800 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Movie Grid / Loading Skeletons / Empty States */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3 animate-pulse shadow-sm"
            >
              <div className="aspect-[2/3] bg-slate-100 rounded-xl w-full" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
              <div className="h-8 bg-slate-200 rounded-xl mt-4" />
            </div>
          ))}
        </div>
      ) : displayedShows.length > 0 ? (
        <>
          {/* Responsive Movie Grid Layout (3 cards per row on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedShows.map((show) => (
              <MovieCard key={show.id} show={show} />
            ))}
          </div>

          {/* Load More Button */}
          {!searchQuery.trim() && hasMore && (
            <div className="pt-10 text-center">
              <button
                onClick={loadMoreShows}
                disabled={loadingMore}
                className="px-8 py-3.5 rounded-2xl bg-[#003459] hover:bg-[#007ea7] disabled:bg-slate-300 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2.5"
              >
                {loadingMore ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Loading more titles...</span>
                  </>
                ) : (
                  <>
                    <Film className="w-4 h-4 text-[#3fcfff]" />
                    <span>Load More Shows</span>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty Search State */
        <div className="py-20 text-center max-w-lg mx-auto space-y-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#007ea7] shadow-inner">
            <Film className="w-10 h-10 stroke-1" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#00171f]">No shows found</h3>
            <p className="text-sm text-slate-500 mt-2">
              We couldn't find any titles matching your search criteria. Try a
              different title or select another genre.
            </p>
          </div>

          {/* Quick Search Suggestions */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-[#003459] uppercase tracking-wider mb-3">
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
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-[#007ea7] text-[#003459] hover:text-white border border-slate-200 transition-colors"
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
