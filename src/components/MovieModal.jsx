import React, { useEffect, useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import {
  X,
  Star,
  Calendar,
  Clock,
  Tv,
  Globe,
  Users,
  Film,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 overflow-y-auto animate-fadeIn"
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border-2 border-slate-300 shadow-2xl modal-enter text-[#00171f]"
      >
        {/* Floating Top Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white hover:bg-slate-100 text-[#003459] hover:text-[#00171f] border-2 border-slate-300 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Close details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner with Poster Backdrop */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#00171f] border-b-2 border-slate-200">
          {!imageError && posterUrl ? (
            <img
              src={posterUrl}
              alt={show.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top opacity-50"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-[#003459] via-[#00171f] to-[#007ea7]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#00171f] via-[#00171f]/50 to-transparent" />

          {/* Quick Header Overlay Content */}
          <div className="absolute bottom-4 inset-x-6 flex items-end gap-5">
            {/* Primary High-res Poster Thumb */}
            <div className="hidden sm:block w-32 md:w-36 aspect-[2/3] rounded-2xl overflow-hidden shadow-xl border-2 border-white shrink-0 bg-slate-900">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={show.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
                  <Film className="w-8 h-8 text-[#00a8e8]" />
                </div>
              )}
            </div>

            <div className="space-y-2 flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#00171f] text-[#3fcfff] border border-[#00a8e8] flex items-center gap-1 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-[#3fcfff]" />
                  {rating !== "NR" ? `${rating} / 10` : "Not Rated"}
                </span>
                {show.status && (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#007ea7] text-white border border-[#003459]">
                    {show.status}
                  </span>
                )}
                {show.type && (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-white border border-slate-700">
                    {show.type}
                  </span>
                )}
              </div>

              <h2
                id="modal-title"
                className="font-almendra text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide drop-shadow-md"
              >
                {show.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 sm:p-8 space-y-8 bg-white">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-xs">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#003459] uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#007ea7]" /> Release Date
              </span>
              <p className="text-sm font-bold text-[#00171f]">
                {show.premiered || "Unknown"}{" "}
                {show.ended ? `– ${show.ended}` : ""}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#003459] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#007ea7]" /> Runtime
              </span>
              <p className="text-sm font-bold text-[#00171f]">
                {show.averageRuntime || show.runtime
                  ? `${show.averageRuntime || show.runtime} mins / ep`
                  : "Varies"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#003459] uppercase tracking-wider flex items-center gap-1.5">
                <Tv className="w-3.5 h-3.5 text-[#007ea7]" /> Network / Channel
              </span>
              <p className="text-sm font-bold text-[#00171f] line-clamp-1">
                {networkName} {networkCountry ? `(${networkCountry})` : ""}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#003459] uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#007ea7]" /> Language
              </span>
              <p className="text-sm font-bold text-[#00171f]">
                {show.language || "English"}
              </p>
            </div>
          </div>

          {/* Genres List */}
          {Array.isArray(show.genres) && show.genres.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-[#003459] uppercase tracking-wider mb-2.5">
                Genres
              </h4>
              <div className="flex flex-wrap gap-2">
                {show.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 text-[#003459] border border-slate-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Overview / Summary */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-[#00171f] flex items-center gap-2">
              <Info className="w-5 h-5 text-[#007ea7]" />
              Synopsis & Overview
            </h4>
            <div
              className="font-architects text-slate-800 text-base sm:text-lg leading-relaxed max-w-none prose p-4 bg-slate-50 rounded-2xl border border-slate-200"
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
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs text-[#003459] flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#007ea7] shrink-0" />
                <span>
                  <strong>Airs on:</strong>{" "}
                  {show.schedule.days?.join(", ") || "Various days"}{" "}
                  {show.schedule.time ? `at ${show.schedule.time}` : ""}
                </span>
              </div>
            )}

          {/* Cast Members */}
          {modalLoading ? (
            <div className="py-6 flex items-center justify-center gap-3 text-sm text-[#007ea7]">
              <div className="w-5 h-5 border-2 border-[#007ea7] border-t-transparent rounded-full animate-spin" />
              <span>Loading cast & crew info...</span>
            </div>
          ) : (
            cast.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-[#00171f] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#007ea7]" />
                  Key Cast & Characters
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {cast.slice(0, 8).map((item, idx) => (
                    <div
                      key={item.person?.id || idx}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                        {item.person?.image?.medium ? (
                          <img
                            src={item.person.image.medium}
                            alt={item.person.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#007ea7] text-xs font-bold">
                            {item.person?.name?.slice(0, 2) || "NA"}
                          </div>
                        )}
                      </div>
                      <div className="text-left overflow-hidden">
                        <p className="text-xs font-bold text-[#00171f] truncate">
                          {item.person?.name}
                        </p>
                        <p className="text-[11px] text-[#003459]/70 truncate">
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
          <div className="pt-6 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleFavorite(show)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer border-2 shadow-xs ${
                  favorited
                    ? "bg-[#007ea7]/10 text-[#007ea7] border-[#007ea7]"
                    : "bg-white hover:bg-slate-100 text-[#003459] border-slate-300"
                }`}
              >
                {favorited ? "In Your Watchlist" : "Add to Watchlist"}
              </button>

              {(show.officialSite || show.url) && (
                <a
                  href={show.officialSite || show.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-slate-100 text-[#003459] hover:text-[#00171f] border-2 border-slate-300 transition-colors shadow-xs"
                >
                  Official Page
                </a>
              )}
            </div>

            <button
              onClick={closeModal}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#007ea7] hover:bg-[#003459] border-2 border-[#003459] text-white shadow-md transition-all cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
