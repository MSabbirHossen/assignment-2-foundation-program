# 🎬 MovieExplorer — Discover TV Shows & Movies

> A modern, responsive, and feature-rich **Movie & TV Show Explorer Application** built with **React 19**, **Vite**, **Tailwind CSS**, and the **TVMaze API**. Browse thousands of titles, search dynamically with instant debounced feedback, filter by genre and status, explore rich show details with embedded cast showcases, and curate a personalized watchlist with local storage persistence.

---

## 🌟 Key Features

### 1. 🏠 Cinematic Landing & Hero Showcase

- **Modern Responsive Navbar**: Dynamic active state indicators, watchlist count badge, mobile drawer navigation, and quick explore CTA.
- **Hero Banner**: Engaging gradient and glowing backdrop aesthetics, headline, engaging summary, embedded quick search, and direct CTA buttons.
- **Featured & Top-Rated Carousel**: Curated showcase of top-tier critically acclaimed series (e.g., _Breaking Bad_, _Game of Thrones_, _Chernobyl_).

### 2. 🔍 Dynamic Search & Movie Catalog

- **Live Debounced Search**: Seamless integration with TVMaze search API (`GET /search/shows?q=:query`) with instant loading spinners and clear actions.
- **Responsive Movie Cards**:
  - High-resolution poster image with graceful fallback placeholders.
  - Release year, runtime, and genre pills.
  - Star rating badge (e.g., ⭐ 8.5 / 10).
  - Quick Watchlist bookmark toggle button with reactive heart animation.
  - Interactive _See Details_ trigger.
- **Rich Filtering & Sorting**:
  - Filter by dynamic genres (_Action_, _Comedy_, _Drama_, _Science-Fiction_, _Thriller_, etc.).
  - Filter by production status (_Running_, _Ended_, _Upcoming_).
  - Sort by Rating (Highest/Lowest), Release Date (Newest/Oldest), or Title (A–Z / Z–A).
- **Infinite Pagination & Load More**: Paginated browsing from `GET /shows` with smooth append loading.

### 3. 🎞️ In-Depth Movie Details Modal

- **Glassmorphic Modal Overlay**: Clean animated slide-up modal with backdrop blur.
- **Rich Metadata Display**: Release dates, average runtime, network/streaming channel, country, language, broadcast schedule, and official site links.
- **Formatted Synopsis**: Cleanly sanitized HTML summary overview.
- **Cast Showcase**: Embedded cast members with actor avatars, actor names, and character roles (`_embedded.cast`).
- **Accessible Controls**: Dismissible via `✕` close button, clicking the backdrop overlay, or pressing the `Escape` key (with background scroll lock).

### 4. ❤️ Watchlist / Favorites Management

- **Local Persistence**: Save your favorite shows to browser `localStorage`.
- **Dedicated Watchlist View**: View, manage, and clear your personal saved collection with empty state guidance.

---

## 🛠️ Technology Stack

| Layer               | Technology                                                                            |
| ------------------- | ------------------------------------------------------------------------------------- |
| **Core Framework**  | [React 19](https://react.dev/) + [Vite](https://vite.dev/)                            |
| **Styling**         | [Tailwind CSS v4](https://tailwindcss.com/) + Custom Glassmorphism & Micro-animations |
| **Icons**           | [Lucide React](https://lucide.dev/)                                                   |
| **Data Source**     | [TVMaze REST API](https://www.tvmaze.com/api)                                         |
| **Code Formatting** | [Prettier](https://prettier.io/)                                                      |

---

## 🌐 API Endpoints Used

- **All Shows Catalog**: `GET https://api.tvmaze.com/shows?page=:page`
- **Show Search**: `GET https://api.tvmaze.com/search/shows?q=:query`
- **Show Details with Cast**: `GET https://api.tvmaze.com/shows/:id?embed[]=cast&embed[]=episodes`

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or later
- **npm**: v9.0.0 or later

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MSabbirHossen/assignment-2-foundation-program.git
   cd assignment-2-foundation-program
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:

   ```bash
   npm run build
   ```

5. **Format codebase**:
   ```bash
   npm run format
   ```

---

## 📂 Project Structure

```
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── FeaturedShows.jsx      # Top rated and trending series showcase
│   │   ├── Footer.jsx             # Footer with branding, links, and attribution
│   │   ├── HeroBanner.jsx         # Hero banner with search and CTA
│   │   ├── MovieCard.jsx          # Reusable movie card with rating & watchlist
│   │   ├── MovieListingView.jsx   # Catalog listing grid with load more
│   │   ├── MovieModal.jsx         # Detailed overlay modal with cast
│   │   ├── Navbar.jsx             # Navigation header with responsive drawer
│   │   ├── SearchBar.jsx          # Search input, genre chips, and sort controls
│   │   └── WatchlistView.jsx      # User saved favorites view
│   ├── context/
│   │   └── MovieContext.jsx       # State management for movies, filters, & favorites
│   ├── services/
│   │   └── tvmazeApi.js           # TVMaze API client & utilities
│   ├── App.jsx                    # Root view orchestrator
│   ├── index.css                  # Design tokens, fonts, and glassmorphism utilities
│   └── main.jsx                   # React DOM entrypoint
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 📜 Conventional Commits

This project strictly adheres to [Conventional Commits](https://www.conventionalcommits.org/):

- `feat(scope)`: New user-facing features (e.g. `feat(core): implement TVMaze API integration...`)
- `fix(scope)`: Bug fixes
- `style(scope)`: Visual styling and UI polish
- `docs(scope)`: Documentation updates
- `chore(scope)`: Tooling, dependency management, and configuration

---

## 📄 License

This project was built for educational and portfolio demonstration purposes. TV show data and imagery are provided by [TVMaze](https://www.tvmaze.com/api).
