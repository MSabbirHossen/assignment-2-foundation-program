/**
 * Formatting Utilities (Single Responsibility Principle)
 */

export function formatRating(rating) {
  if (rating === null || rating === undefined || rating === "NR") return "NR";
  const num = Number(rating);
  return Number.isNaN(num) ? "NR" : num.toFixed(1);
}

export function formatYear(dateString) {
  if (!dateString) return "N/A";
  return dateString.slice(0, 4);
}

export function formatRuntime(runtime, averageRuntime) {
  const time = averageRuntime || runtime;
  return time ? `${time}m` : "Varies";
}

export function stripHtml(htmlString) {
  if (!htmlString) return "";
  return htmlString.replace(/<[^>]*>?/gm, "");
}
