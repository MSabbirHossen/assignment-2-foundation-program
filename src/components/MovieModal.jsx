import React, { useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { useWatchlist } from "../context/WatchlistContext";
import ModalHeader from "./modal/ModalHeader";
import ModalMetaGrid from "./modal/ModalMetaGrid";
import ModalCastList from "./modal/ModalCastList";
import ModalActions from "./modal/ModalActions";
import { X, Info, Clock } from "lucide-react";

/**
 * Movie Modal Coordinator (Single Responsibility Principle)
 */
export default function MovieModal() {
  const { selectedShow, modalDetails, modalLoading, closeModal } = useModal();
  const { isFavorite, toggleFavorite } = useWatchlist();

  // Handle Escape key and lock body scrolling
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
        {/* Top Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white hover:bg-slate-100 text-[#003459] hover:text-[#00171f] border-2 border-slate-300 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Close details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner Header */}
        <ModalHeader show={show} />

        {/* Modal Content Details */}
        <div className="p-6 sm:p-8 space-y-8 bg-white">
          {/* Metadata Grid */}
          <ModalMetaGrid show={show} />

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

          {/* Overview / Synopsis */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-[#00171f] flex items-center gap-2">
              <Info className="w-5 h-5 text-[#007ea7]" />
              Synopsis & Overview
            </h4>
            <div
              className="font-roboto text-slate-800 text-base sm:text-lg leading-relaxed max-w-none prose p-4 bg-slate-50 rounded-2xl border border-slate-200"
              dangerouslySetInnerHTML={{
                __html:
                  show.summary ||
                  "<p>No official description has been provided for this title.</p>",
              }}
            />
          </div>

          {/* Broadcast Schedule Info */}
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
          <ModalCastList cast={cast} loading={modalLoading} />

          {/* Action Buttons */}
          <ModalActions
            show={show}
            favorited={favorited}
            onToggleFavorite={toggleFavorite}
            onClose={closeModal}
          />
        </div>
      </div>
    </div>
  );
}
