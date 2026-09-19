import React, { useState } from "react";
import { useModal } from "../context/ModalContext";
import { useWatchlist } from "../context/WatchlistContext";
import RatingBadge from "./ui/RatingBadge";
import { formatYear } from "../utils/formatting";
import { Calendar, Clock, Heart, Eye, Film } from "lucide-react";

/**
 * Movie Card Component (SRP & ISP)
 */
export default function MovieCard({ show }) {
  const { openModal } = useModal();
  const { isFavorite, toggleFavorite } = useWatchlist();
  const [imageError, setImageError] = useState(false);

  if (!show) return null;

  const favorited = isFavorite(show.id);
  const releaseYear = formatYear(show.premiered);
  const posterUrl = show.image?.medium || show.image?.original;
  const genres = Array.isArray(show.genres) ? show.genres.slice(0, 2) : [];

  const handleCardClick = () => {
    openModal(show);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(show);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col rounded-2xl bg-white border-2 border-slate-200 hover:border-[#007ea7] transition-all duration-200 hover:-translate-y-1.5 shadow-md hover:shadow-xl overflow-hidden cursor-pointer"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
        {!imageError && posterUrl ? (
          <img
            src={posterUrl}
            alt={show.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-100 text-slate-500 text-center">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#00171f]/80 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity" />

        {/* Top Badges: Rating & Favorite Toggle */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <RatingBadge rating={show.rating?.average} />

          <button
            onClick={handleFavoriteClick}
            title={favorited ? "Remove from watchlist" : "Add to watchlist"}
            className={`p-2 rounded-xl transition-all duration-200 border-2 cursor-pointer shadow-md ${
              favorited
                ? "bg-[#007ea7] text-white border-[#003459] scale-105"
                : "bg-white text-[#003459] border-slate-300 hover:bg-[#007ea7] hover:text-white hover:border-[#007ea7]"
            }`}
            aria-label="Toggle Watchlist"
          >
            <Heart className={`w-4 h-4 ${favorited ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="px-4 py-2 rounded-xl bg-[#007ea7] text-white border border-[#003459] font-bold text-xs tracking-wide shadow-xl flex items-center gap-1.5 transform scale-95 group-hover:scale-100 transition-transform">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 text-left justify-between gap-3 bg-white border-t border-slate-200">
        <div>
          {/* Genre Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {genres.length > 0 ? (
              genres.map((g) => (
                <span
                  key={g}
                  className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-[#003459] border border-slate-300"
                >
                  {g}
                </span>
              ))
            ) : (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                Show
              </span>
            )}
            {show.status && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                {show.status}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
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

        {/* CTA: See Details Button (retaining eye icon) */}
        <button
          onClick={handleCardClick}
          className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#003459] hover:bg-[#007ea7] border-2 border-[#003459] hover:border-[#007ea7] transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-xs cursor-pointer"
        >
          <span>See Details</span>
          <Eye className="w-3.5 h-3.5 text-white/80 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
