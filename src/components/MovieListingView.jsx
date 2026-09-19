import React, { useState, useEffect } from "react";
import { useMovieContext } from "../context/MovieContext";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import { Film, AlertCircle } from "lucide-react";

export default function MovieListingView() {
  const {
    displayedShows,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedGenre,
    sortBy,
    statusFilter,
    hasMore,
    loadingMore,
    loadMoreShows,
  } = useMovieContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Reset to page 1 whenever search, filters, or items per page change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenre, sortBy, statusFilter, itemsPerPage]);

  const handleSuggestionClick = (query) => {
    setSearchQuery(query);
  };

  // Pagination calculations
  const totalItems = displayedShows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentShows = displayedShows.slice(startIndex, endIndex);

  // Auto-fetch next API batch if user nears the end of allShows (for TVMaze pagination)
  useEffect(() => {
    if (
      !searchQuery.trim() &&
      hasMore &&
      !loadingMore &&
      currentPage >= totalPages - 1 &&
      displayedShows.length > 0
    ) {
      loadMoreShows();
    }
  }, [
    currentPage,
    totalPages,
    hasMore,
    loadingMore,
    searchQuery,
    displayedShows.length,
    loadMoreShows,
  ]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const listingElement = document.getElementById("movie-listing-section");
      if (listingElement) {
        listingElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="movie-listing-section"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"
    >
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
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
          {/* Top Pagination Controls / Items Per Page Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-[#003459] bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div>
              Page <span className="font-bold text-[#007ea7]">{currentPage}</span> of{" "}
              <span className="font-bold text-[#007ea7]">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="items-per-page-select" className="text-slate-600">
                Shows per page:
              </label>
              <select
                id="items-per-page-select"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-[#00171f] focus:outline-none focus:ring-2 focus:ring-[#007ea7] cursor-pointer shadow-xs"
              >
                <option value={9}>9 (3x3)</option>
                <option value={12}>12 (3x4)</option>
                <option value={18}>18 (3x6)</option>
                <option value={24}>24 (3x8)</option>
              </select>
            </div>
          </div>

          {/* Responsive Movie Grid Layout (3 cards per row on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {currentShows.map((show) => (
              <MovieCard key={show.id} show={show} />
            ))}
          </div>

          {/* Bottom Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
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

