import React, { useState } from "react";
import RatingBadge from "../ui/RatingBadge";
import { Film } from "lucide-react";

export default function ModalHeader({ show }) {
  const [imageError, setImageError] = useState(false);
  const posterUrl = show.image?.original || show.image?.medium;

  return (
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

      {/* Header Overlay Content */}
      <div className="absolute bottom-4 inset-x-6 flex items-end gap-5">
        {/* Primary High-res Poster Thumbnail */}
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
            <RatingBadge rating={show.rating?.average} showScale />
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
  );
}
