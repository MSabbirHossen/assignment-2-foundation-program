import React from "react";
import { Link } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "./MovieCard";
import { Heart, Film, ArrowRight, Trash2 } from "lucide-react";

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-rose-400" />
            <span>Personal Collection</span>
          </div>
          <h1 className="font-almendra text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
            My Watchlist
          </h1>
          <p className="font-architects text-base sm:text-lg text-slate-300 mt-1">
            Saved movies and series bookmarked for later watching
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-semibold">
              {favorites.length} {favorites.length === 1 ? "title" : "titles"}{" "}
              saved
            </span>
            <button
              onClick={handleClearWatchlist}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Grid or Empty State */}
      {favorites.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto space-y-5">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-400 shadow-xl">
            <Heart className="w-10 h-10 stroke-1" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Your watchlist is currently empty
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Browse movies and click the heart icon on any card to save it to
              your personal watchlist.
            </p>
          </div>
          <Link
            to="/movies"
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 inline-flex items-center gap-2 transition-all hover:scale-105"
          >
            <span>Explore Movies</span>
            <ArrowRight className="w-4 h-4" />
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
