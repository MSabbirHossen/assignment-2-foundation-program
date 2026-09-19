import React, { useEffect } from "react";
import { useShows } from "../context/ShowsContext";
import { usePagination } from "../hooks/usePagination";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import EmptyState from "./ui/EmptyState";
import ErrorBanner from "./ui/ErrorBanner";
import { Film } from "lucide-react";

/**
 * Movie Catalog Listing View (Single Responsibility Principle)
 */
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
  } = useShows();

  const {
    currentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
  } = usePagination({
    totalItems: displayedShows.length,
    initialItemsPerPage: 12,
    resetDependencies: [searchQuery, selectedGenre, sortBy, statusFilter],
  });

  const currentShows = displayedShows.slice(startIndex, endIndex);

  // Auto-fetch next API batch if user nears the end of allShows
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
    goToPage(newPage);
    const listingElement = document.getElementById("movie-listing-section");
    if (listingElement) {
      listingElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
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
      <ErrorBanner message={error} onRetry={() => window.location.reload()} />

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
              Page{" "}
              <span className="font-bold text-[#007ea7]">{currentPage}</span> of{" "}
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
            totalItems={displayedShows.length}
            itemsPerPage={itemsPerPage}
          />
        </>
      ) : (
        /* Empty Search State */
        <EmptyState
          icon={<Film className="w-10 h-10 stroke-1" />}
          title="No shows found"
          description="We couldn't find any titles matching your search criteria. Try a different title or select another genre."
        >
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
                  onClick={() => setSearchQuery(term)}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-[#007ea7] text-[#003459] hover:text-white border border-slate-200 transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </EmptyState>
      )}
    </section>
  );
}
