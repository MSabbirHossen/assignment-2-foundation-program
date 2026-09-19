import React, { useEffect, useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import {
  X,
  Star,
  Calendar,
  Clock,
  ExternalLink,
  Tv,
  Globe,
  Heart,
  Users,
  Film,
  Sparkles,
  Info,
} from "lucide-react";

export default function MovieModal() {
  const {
    selectedShow,
    modalDetails,
    modalLoading,
    closeModal,
    isFavorite,
    toggleFavorite,
  } = useMovieContext();
  const [imageError, setImageError] = useState(false);

  // Close on Escape key and lock body scroll
  useEffect(() => {
    if (!selectedShow) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedShow, closeModal]);

  if (!selectedShow) return null;

  const show = modalDetails || selectedShow;
  const favorited = isFavorite(show.id);
  const posterUrl = show.image?.original || show.image?.medium;
  const rating = show.rating?.average
    ? Number(show.rating.average).toFixed(1)
    : "NR";
  const releaseYear = show.premiered ? show.premiered.slice(0, 4) : "N/A";
  const networkName = show.network?.name || show.webChannel?.name || "Various";
  const networkCountry =
    show.network?.country?.name || show.webChannel?.country?.name || "";
  const cast = show._embedded?.cast || [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0d1424] border border-slate-700/80 shadow-2xl modal-enter text-slate-200"
      >
        {/* Floating Top Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 backdrop-blur-md shadow-lg transition-all hover:scale-110 active:scale-95"
          aria-label="Close details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner with Poster Backdrop */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
          {!imageError && posterUrl ? (
            <img
              src={posterUrl}
              alt={show.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top filter blur-sm scale-105 opacity-40"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-indigo-950 via-slate-900 to-cyan-950" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-[#0d1424]/60 to-transparent" />

          {/* Quick Header Overlay Content */}
          <div className="absolute bottom-4 inset-x-6 flex items-end gap-5">
            {/* Primary High-res Poster Thumb */}
            <div className="hidden sm:block w-32 md:w-36 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/80 shrink-0 bg-slate-900">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={show.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                  <Film className="w-8 h-8" />
                </div>
              )}
            </div>

            <div className="space-y-2 flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/90 text-slate-950 flex items-center gap-1 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  {rating !== "NR" ? `${rating} / 10` : "Not Rated"}
                </span>
                {show.status && (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {show.status}
                  </span>
                )}
                {show.type && (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
                    {show.type}
                  </span>
                )}
              </div>

              <h2
                id="modal-title"
                className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight"
              >
                {show.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Release
                Date
              </span>
              <p className="text-sm font-bold text-white">
                {show.premiered || "Unknown"}{" "}
                {show.ended ? `– ${show.ended}` : ""}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> Runtime
              </span>
              <p className="text-sm font-bold text-white">
                {show.averageRuntime || show.runtime
                  ? `${show.averageRuntime || show.runtime} mins / ep`
                  : "Varies"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Tv className="w-3.5 h-3.5 text-indigo-400" /> Network / Channel
              </span>
              <p className="text-sm font-bold text-white line-clamp-1">
                {networkName} {networkCountry ? `(${networkCountry})` : ""}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" /> Language
              </span>
              <p className="text-sm font-bold text-white">
                {show.language || "English"}
              </p>
            </div>
          </div>

          {/* Genres List */}
          {Array.isArray(show.genres) && show.genres.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Genres
              </h4>
              <div className="flex flex-wrap gap-2">
                {show.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-900/40 text-indigo-300 border border-indigo-500/30"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Overview / Summary */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-400" />
              Synopsis & Overview
            </h4>
            <div
              className="text-slate-300 text-sm sm:text-base leading-relaxed prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html:
                  show.summary ||
                  "<p>No official description has been provided for this title.</p>",
              }}
            />
          </div>

          {/* Schedule Info */}
          {show.schedule &&
            (show.schedule.days?.length > 0 || show.schedule.time) && (
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 text-xs text-indigo-200 flex items-center gap-3">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>
                  <strong>Airs on:</strong>{" "}
                  {show.schedule.days?.join(", ") || "Various days"}{" "}
                  {show.schedule.time ? `at ${show.schedule.time}` : ""}
                </span>
              </div>
            )}

          {/* Cast Members (TVMaze Embedded Data) */}
          {modalLoading ? (
            <div className="py-6 flex items-center justify-center gap-3 text-sm text-slate-400">
              <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <span>Loading cast & crew info...</span>
            </div>
          ) : (
            cast.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-400" />
                  Key Cast & Characters
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {cast.slice(0, 8).map((item, idx) => (
                    <div
                      key={item.person?.id || idx}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                        {item.person?.image?.medium ? (
                          <img
                            src={item.person.image.medium}
                            alt={item.person.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs font-bold">
                            {item.person?.name?.slice(0, 2) || "NA"}
                          </div>
                        )}
                      </div>
                      <div className="text-left overflow-hidden">
                        <p className="text-xs font-bold text-white truncate">
                          {item.person?.name}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          as {item.character?.name || "Cast"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          {/* Action Footer */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleFavorite(show)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                  favorited
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${favorited ? "fill-rose-400 text-rose-400" : ""}`}
                />
                {favorited ? "In Your Watchlist" : "Add to Watchlist"}
              </button>

              {(show.officialSite || show.url) && (
                <a
                  href={show.officialSite || show.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 flex items-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-indigo-400" />
                  Official Page
                </a>
              )}
            </div>

            <button
              onClick={closeModal}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
