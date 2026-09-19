import React from "react";
import { Link } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "./MovieCard";
import { Heart } from "lucide-react";

export default function WatchlistView() {
  const { favorites, toggleFavorite } = useMovieContext();

  const handleClearWatchlist = () => {
    if (
      window.confirm("Are you sure you want to clear your entire watchlist?")
    ) {
      favorites.forEach((item) => toggleFavorite(item));
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
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Grid or Empty State */}
      {favorites.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto space-y-5 bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-white border border-slate-200 flex items-center justify-center text-[#007ea7] shadow-sm">
            <Heart className="w-10 h-10 stroke-1" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#00171f]">
              Your watchlist is currently empty
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Browse movies and save your favorite titles to your personal
              watchlist.
            </p>
          </div>
          <Link
            to="/movies"
            className="px-6 py-3 rounded-2xl bg-[#007ea7] hover:bg-[#003459] text-white font-bold text-sm shadow-md shadow-[#007ea7]/20 inline-flex items-center justify-center transition-all hover:scale-105"
          >
            <span>Explore Movies</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((show) => (
            <MovieCard key={show.id} show={show} />
          ))}
        </div>
      )}
    </div>
  );
}
