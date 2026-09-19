import React, { useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import { Star, Calendar, Clock, Heart, Eye, Film } from "lucide-react";

export default function MovieCard({ show }) {
  const { openModal, isFavorite, toggleFavorite } = useMovieContext();
  const [imageError, setImageError] = useState(false);

  if (!show) return null;

  const favorited = isFavorite(show.id);
  const releaseYear = show.premiered ? show.premiered.slice(0, 4) : "N/A";
  const rating = show.rating?.average
    ? Number(show.rating.average).toFixed(1)
    : "NR";
  const posterUrl = show.image?.medium || show.image?.original;
  const genres = Array.isArray(show.genres) ? show.genres.slice(0, 2) : [];

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/90 hover:border-[#007ea7]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-md hover:shadow-xl hover:shadow-[#007ea7]/15 overflow-hidden">
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
        {!imageError && posterUrl ? (
          <img
            src={posterUrl}
            alt={show.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-100 to-slate-200 text-slate-500 text-center">
            <Film className="w-12 h-12 mb-2 text-[#007ea7]" />
            <span className="text-xs font-semibold text-[#00171f] line-clamp-2 px-2">
              {show.name}
            </span>
            <span className="text-[10px] text-slate-400 mt-1">
              No Poster Available
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00171f]/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges: Rating & Favorite Toggle */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#00171f]/90 text-[#3fcfff] border border-[#00a8e8]/30 backdrop-blur-md shadow-md">
            <Star className="w-3.5 h-3.5 fill-[#3fcfff]" />
            {rating !== "NR" ? rating : "NR"}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(show);
            }}
            title={favorited ? "Remove from watchlist" : "Add to watchlist"}
            className={`p-2 rounded-xl backdrop-blur-md transition-all duration-200 border ${
              favorited
                ? "bg-[#007ea7] text-white border-[#00a8e8] shadow-md shadow-[#007ea7]/30 scale-105"
                : "bg-white/80 text-[#003459] border-slate-200 hover:bg-[#007ea7] hover:text-white hover:scale-110"
            }`}
            aria-label="Toggle Watchlist"
          >
            <Heart className={`w-4 h-4 ${favorited ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="px-4 py-2 rounded-xl bg-[#007ea7]/95 text-white font-semibold text-xs tracking-wide shadow-xl backdrop-blur-md flex items-center gap-1.5 transform scale-90 group-hover:scale-100 transition-transform">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 text-left justify-between gap-3 bg-white">
        <div>
          {/* Genre Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {genres.length > 0 ? (
              genres.map((g) => (
                <span
                  key={g}
                  className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#007ea7]/10 text-[#003459] border border-[#007ea7]/20"
                >
                  {g}
                </span>
              ))
            ) : (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600">
                Show
              </span>
            )}
            {show.status && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-700">
                {show.status}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => openModal(show)}
            title={show.name}
            className="font-almendra text-lg sm:text-xl font-bold text-[#00171f] group-hover:text-[#007ea7] transition-colors line-clamp-1 cursor-pointer tracking-wider"
          >
            {show.name}
          </h3>

          {/* Release Year & Runtime */}
          <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 font-medium">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#007ea7]" />
              <span>{releaseYear}</span>
            </div>
            {show.runtime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#007ea7]" />
                <span>{show.runtime}m</span>
              </div>
            )}
          </div>
        </div>

        {/* CTA: See Details Button */}
        <button
          onClick={() => openModal(show)}
          className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#003459] hover:bg-[#007ea7] border border-[#003459] hover:border-[#007ea7] transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-sm"
        >
          <span>See Details</span>
          <Eye className="w-3.5 h-3.5 text-white/80 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
