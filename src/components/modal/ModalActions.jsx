import React from "react";

export default function ModalActions({
  show,
  favorited,
  onToggleFavorite,
  onClose,
}) {
  return (
    <div className="pt-6 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggleFavorite(show)}
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
        onClick={onClose}
        className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#007ea7] hover:bg-[#003459] border-2 border-[#003459] text-white shadow-md transition-all cursor-pointer"
      >
        Close Details
      </button>
    </div>
  );
}
