import React from "react";
import { Search, X } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  onClear,
  isSearching,
  placeholder = "Search by title (e.g. Breaking Bad, Girls, Batman, Stranger Things)...",
}) {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="relative flex items-center group">
        <div className="absolute left-4.5 pointer-events-none text-[#007ea7] group-focus-within:text-[#003459] transition-colors">
          <Search className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        <input
          id="movie-search-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-13 pr-24 py-4 sm:py-5 rounded-2xl bg-white border-2 border-slate-300 hover:border-[#007ea7]/60 focus:border-[#007ea7] text-[#00171f] placeholder-slate-400 text-sm sm:text-base font-medium shadow-md focus:outline-none focus:ring-4 focus:ring-[#007ea7]/15 transition-all"
        />

        {/* Right Status Indicator / Clear Action */}
        <div className="absolute right-4 flex items-center gap-2">
          {isSearching && (
            <div className="w-5 h-5 border-2 border-[#007ea7] border-t-transparent rounded-full animate-spin" />
          )}

          {value && !isSearching && (
            <button
              onClick={onClear}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-[#00171f] transition-colors cursor-pointer"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
