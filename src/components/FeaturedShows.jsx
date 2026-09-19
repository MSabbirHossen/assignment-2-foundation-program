import React from "react";
import { Link } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "./MovieCard";

export default function FeaturedShows() {
  const { topRatedShows } = useMovieContext();

  if (!topRatedShows || topRatedShows.length === 0) return null;

  return (
    <section className="py-12 border-t border-slate-200 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[#007ea7] text-xs font-bold uppercase tracking-wider mb-1">
              <span>Critically Acclaimed</span>
            </div>
            <h2 className="font-almendra text-3xl sm:text-4xl font-bold text-[#00171f] tracking-wide">
              Top Rated & Trending Shows
            </h2>
            <p className="font-architects text-base sm:text-lg text-[#003459]/70 mt-1">
              Highest scoring series with phenomenal ratings across critics and
              viewers
            </p>
          </div>

          <Link
            to="/movies"
            className="inline-flex items-center text-sm font-bold text-[#007ea7] hover:text-[#003459] transition-colors"
          >
            <span>View Full Directory</span>
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
