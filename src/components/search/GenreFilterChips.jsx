import React from "react";
import { Filter } from "lucide-react";

export default function GenreFilterChips({
  genres = [],
  selectedGenre,
  onSelectGenre,
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full">
      <span className="text-xs font-bold text-[#003459] uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1">
        <Filter className="w-3.5 h-3.5 text-[#007ea7]" /> Genre:
      </span>
      <div className="flex items-center gap-1.5 flex-nowrap">
        {genres.slice(0, 10).map((genre) => {
          const isSelected = selectedGenre === genre;
          return (
            <button
              key={genre}
              onClick={() => onSelectGenre(genre)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#007ea7] text-white shadow-md shadow-[#007ea7]/25"
                  : "bg-white text-[#003459] hover:bg-[#007ea7]/10 hover:text-[#007ea7] border border-slate-200"
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
}
