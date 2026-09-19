/**
 * TVMaze API Service
 * Reference: https://www.tvmaze.com/api
 */

const BASE_URL = "https://api.tvmaze.com";

/**
 * Fetch a list of shows (paginated by page index, default 0)
 */
export async function fetchShows(page = 0) {
  try {
    const response = await fetch(`${BASE_URL}/shows?page=${page}`);
    if (!response.ok) {
      if (response.status === 404) return []; // end of pagination
      throw new Error(`Failed to fetch shows: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching shows:", error);
    throw error;
  }
}

/**
 * Search shows by title / query
 * Returns array of show objects
 */
export async function searchShows(query) {
  if (!query || !query.trim()) return [];
  try {
    const response = await fetch(
      `${BASE_URL}/search/shows?q=${encodeURIComponent(query.trim())}`,
    );
    if (!response.ok) {
      throw new Error(`Failed to search shows: ${response.statusText}`);
    }
    const data = await response.json();
    // Normalize format: map [{ score, show }] to show objects with searchScore
    return data.map((item) => ({
      ...item.show,
      searchScore: item.score,
    }));
  } catch (error) {
    console.error("Error searching shows:", error);
    throw error;
  }
}

/**
 * Fetch detailed show info including cast and episodes
 */
export async function fetchShowDetails(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/shows/${id}?embed[]=cast&embed[]=episodes`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch show details: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching show details for ID ${id}:`, error);
    throw error;
  }
}

/**
 * Utility: Clean HTML tags from TVMaze summary strings
 */
export function sanitizeSummary(htmlString) {
  if (!htmlString) return "No description available for this title.";
  // Strip tags but preserve formatting where appropriate
  const temp = document.createElement("div");
  temp.innerHTML = htmlString;
  return temp.textContent || temp.innerText || "";
}

/**
 * Utility: Safe image getter with fallback placeholder
 */
export function getShowImage(show, size = "medium") {
  if (show?.image?.[size]) {
    return show.image[size];
  }
  if (show?.image?.original || show?.image?.medium) {
    return show.image.original || show.image.medium;
  }
  // Fallback high quality placeholder with show title
  return null;
}
