import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) {
  if (totalPages <= 1) return null;

  // Calculate visible page range (with smart ellipsis)
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2; // number of pages to show around current page

    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);

    if (left > 1) {
      pages.push(1);
      if (left > 2) {
        pages.push("...");
      }
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages) {
      if (right < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-4 border-t-2 border-slate-200">
      {/* Items Range Summary */}
      <div className="text-xs sm:text-sm font-semibold text-[#003459]">
        Showing <span className="text-[#007ea7] font-bold">{startItem}</span> to{" "}
        <span className="text-[#007ea7] font-bold">{endItem}</span> of{" "}
        <span className="text-[#00171f] font-bold">{totalItems}</span> shows
      </div>

      {/* Pagination Controls */}
      <nav
        aria-label="Pagination Navigation"
        className="flex flex-wrap items-center gap-1.5 sm:gap-2"
      >
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 bg-[#003459] text-white hover:bg-[#007ea7] border-[#003459] cursor-pointer"
          aria-label="Go to previous page"
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pages.map((pageItem, index) => {
            if (pageItem === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-1 text-sm font-bold text-slate-400 select-none"
                >
                  ...
                </span>
              );
            }

            const isCurrent = pageItem === currentPage;
            return (
              <button
                key={pageItem}
                onClick={() => onPageChange(pageItem)}
                aria-current={isCurrent ? "page" : undefined}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all shadow-xs cursor-pointer ${
                  isCurrent
                    ? "bg-[#007ea7] text-white border-[#003459] shadow-md scale-105"
                    : "bg-white text-[#003459] hover:bg-slate-100 hover:text-[#007ea7] border-slate-300"
                }`}
              >
                {pageItem}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 bg-[#003459] text-white hover:bg-[#007ea7] border-[#003459] cursor-pointer"
          aria-label="Go to next page"
        >
          Next
        </button>
      </nav>
    </div>
  );
}
