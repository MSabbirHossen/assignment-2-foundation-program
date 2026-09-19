/**
 * Show Sorting Strategies (Open/Closed Principle)
 * New sorting algorithms can be added by registering strategies without altering existing code.
 */

export const sortStrategies = {
  "rating-desc": (a, b) => (b.rating?.average || 0) - (a.rating?.average || 0),
  "rating-asc": (a, b) => (a.rating?.average || 0) - (b.rating?.average || 0),
  "name-asc": (a, b) => (a.name || "").localeCompare(b.name || ""),
  "name-desc": (a, b) => (b.name || "").localeCompare(a.name || ""),
  "year-desc": (a, b) => (b.premiered || "").localeCompare(a.premiered || ""),
  "year-asc": (a, b) => (a.premiered || "").localeCompare(b.premiered || ""),
  featured: (a, b) => {
    // If searchScore exists (from TVMaze search), sort by relevance score
    if (a.searchScore !== undefined && b.searchScore !== undefined) {
      return (b.searchScore || 0) - (a.searchScore || 0);
    }
    return 0; // maintain natural API order
  },
};

/**
 * Sorts an array of shows using the specified strategy key.
 * @param {Array} shows
 * @param {string} strategyKey
 * @returns {Array} sorted copy of shows
 */
export function sortShows(shows, strategyKey = "featured") {
  if (!Array.isArray(shows)) return [];
  const strategy = sortStrategies[strategyKey] || sortStrategies.featured;
  return [...shows].sort(strategy);
}
