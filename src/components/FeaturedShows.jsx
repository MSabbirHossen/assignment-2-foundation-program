import React from "react";
import { Link } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "./MovieCard";
import { Sparkles, TrendingUp, ArrowRight } from "lucide-react";

export default function FeaturedShows() {
  const { topRatedShows } = useMovieContext();

  if (!topRatedShows || topRatedShows.length === 0) return null;

  return (
    <section className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Critically Acclaimed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Top Rated & Trending Shows
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Highest scoring series with phenomenal ratings across critics and
              viewers
            </p>
          </div>

          <Link
            to="/movies"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors group"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-column Grid for Top Rated */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRatedShows.slice(0, 4).map((show) => (
            <MovieCard key={show.id} show={show} />
          ))}
        </div>
      </div>
    </section>
  );
}
