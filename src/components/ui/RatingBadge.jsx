import React from "react";
import { Star } from "lucide-react";
import { formatRating } from "../../utils/formatting";

/**
 * Reusable Rating Badge (Liskov Substitution Principle & SRP)
 */
export default function RatingBadge({
  rating,
  showScale = false,
  className = "",
}) {
  const formatted = formatRating(rating);

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#00171f] text-[#3fcfff] border border-[#00a8e8] shadow-md ${className}`}
    >
      <Star className="w-3.5 h-3.5 fill-[#3fcfff]" />
      <span>
        {formatted}
        {showScale && formatted !== "NR" ? " / 10" : ""}
      </span>
    </span>
  );
}
