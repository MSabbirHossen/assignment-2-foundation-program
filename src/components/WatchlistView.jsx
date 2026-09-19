import React from "react";
import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "./MovieCard";
import EmptyState from "./ui/EmptyState";
import { Heart } from "lucide-react";

/**
 * Watchlist View Component (SRP & ISP)
 */
export default function WatchlistView() {
  const { favorites, clearWatchlist } = useWatchlist();

  const handleClearWatchlist = () => {
    if (
      window.confirm("Are you sure you want to clear your entire watchlist?")
    ) {
      clearWatchlist();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <div className="text-[#007ea7] text-xs font-bold uppercase tracking-wider mb-1">
            <span>Personal Collection</span>
          </div>
          <h1 className="font-almendra text-3xl sm:text-4xl md:text-5xl font-bold text-[#00171f] tracking-wide">
            My Watchlist
          </h1>
          <p className="font-architects text-base sm:text-lg text-[#003459]/70 mt-1">
            Saved movies and series bookmarked for later watching
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#003459] font-bold">
              {favorites.length} {favorites.length === 1 ? "title" : "titles"}{" "}
              saved
            </span>
            <button
              onClick={handleClearWatchlist}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Grid or Empty State */}
      {favorites.length === 0 ? (
        <EmptyState
          icon={<Heart className="w-10 h-10 stroke-1 text-[#007ea7]" />}
          title="Your watchlist is currently empty"
          description="Browse movies and save your favorite titles to your personal watchlist."
          action={
            <Link
              to="/movies"
              className="px-6 py-3 rounded-2xl bg-[#007ea7] hover:bg-[#003459] text-white font-bold text-sm shadow-md shadow-[#007ea7]/20 inline-flex items-center justify-center transition-all hover:scale-105"
            >
              Explore Movies
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {favorites.map((show) => (
            <MovieCard key={show.id} show={show} />
          ))}
        </div>
      )}
    </div>
  );
}
