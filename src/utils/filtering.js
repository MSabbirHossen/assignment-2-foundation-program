/**
 * Show Filtering Pipeline (Open/Closed Principle & Single Responsibility)
 * Composable filter predicates that can be extended or chained.
 */

export const filterPredicates = {
  genre: (show, selectedGenre) => {
    if (!selectedGenre || selectedGenre === "All") return true;
    return Array.isArray(show.genres) && show.genres.includes(selectedGenre);
  },

  status: (show, selectedStatus) => {
    if (!selectedStatus || selectedStatus === "All") return true;
    return show.status === selectedStatus;
  },
};

/**
 * Filters shows against genre and status criteria.
 * @param {Array} shows
 * @param {Object} filters { genre, status }
 * @returns {Array}
 */
export function filterShows(shows, { genre = "All", status = "All" } = {}) {
  if (!Array.isArray(shows)) return [];

  return shows.filter((show) => {
    const matchesGenre = filterPredicates.genre(show, genre);
    const matchesStatus = filterPredicates.status(show, status);
    return matchesGenre && matchesStatus;
  });
}

/**
 * Extracts all unique genres from a list of shows.
 * @param {Array} shows
 * @returns {Array<string>}
 */
export function extractGenres(shows) {
  const genreSet = new Set();
  const standardGenres = [
    "Drama",
    "Action",
    "Comedy",
    "Science-Fiction",
    "Thriller",
    "Crime",
    "Adventure",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Anime",
    "Supernatural",
  ];
  standardGenres.forEach((g) => genreSet.add(g));

  if (Array.isArray(shows)) {
    shows.forEach((show) => {
      if (Array.isArray(show.genres)) {
        show.genres.forEach((g) => genreSet.add(g));
      }
    });
  }

  return ["All", ...Array.from(genreSet).sort()];
}
