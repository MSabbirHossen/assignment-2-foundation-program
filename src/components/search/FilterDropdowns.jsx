import React from "react";

export default function FilterDropdowns({
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  hasActiveFilters,
  onReset,
}) {
  return (
    <div className="flex items-center gap-2.5 shrink-0 justify-end">
      {/* Status Filter */}
      <div className="flex items-center gap-1.5">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by show status"
          className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-[#00171f] focus:outline-none focus:ring-2 focus:ring-[#007ea7] cursor-pointer shadow-xs"
        >
          <option value="All">All Statuses</option>
          <option value="Running">Running</option>
          <option value="Ended">Ended</option>
          <option value="To Be Determined">Upcoming</option>
        </select>
      </div>

      {/* Sorting Select */}
      <div className="flex items-center gap-1.5">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort shows by"
          className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-[#00171f] focus:outline-none focus:ring-2 focus:ring-[#007ea7] cursor-pointer shadow-xs"
        >
          <option value="featured">Sort: Featured</option>
          <option value="rating-desc">Rating: Highest First</option>
          <option value="rating-asc">Rating: Lowest First</option>
          <option value="year-desc">Year: Newest First</option>
          <option value="year-asc">Year: Oldest First</option>
          <option value="name-asc">Title: A to Z</option>
          <option value="name-desc">Title: Z to A</option>
        </select>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors shrink-0 cursor-pointer"
          title="Reset all filters"
        >
          Reset
        </button>
      )}
    </div>
  );
}
