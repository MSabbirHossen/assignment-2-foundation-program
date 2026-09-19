import React, { useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import {
  Search,
  Flame,
  Play,
  Star,
  Sparkles,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export default function HeroBanner() {
  const {
    setActiveTab,
    searchQuery,
    setSearchQuery,
    topRatedShows,
    openModal,
  } = useMovieContext();
  const [localSearch, setLocalSearch] = useState("");

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setActiveTab("explore");
    } else {
      setActiveTab("explore");
    }
  };

  const featuredHeroShow = topRatedShows[0] || {
    name: "Breaking Bad",
    premiered: "2008-01-20",
    rating: { average: 9.5 },
    genres: ["Drama", "Crime", "Thriller"],
    summary:
      "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family’s future.",
    image: {
      original:
        "https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg",
    },
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20">
      {/* Background Cinematic Gradients & Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-indigo-900/30 via-cyan-900/20 to-purple-900/20 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute -top-24 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-4 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Typography & CTA */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-cyan-300 shadow-sm backdrop-blur-md animate-pulse-glow">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>OVER 50,000+ TV SHOWS & MOVIES LIVE</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
              DISCOVER{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-teal-200">
                MOVIES
              </span>{" "}
              & EPIC SHOWS
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
              Explore and discover your favorite movies and television series
              from around the world. Search instantly by title, filter by
              genres, and dive into cast details and summaries.
            </p>

            {/* Interactive Search Bar within Hero */}
            <form onSubmit={handleHeroSearchSubmit} className="max-w-xl">
              <div className="relative flex items-center group">
                <div className="absolute left-4 pointer-events-none text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search for Breaking Bad, Stranger Things, Anime..."
                  className="w-full pl-12 pr-32 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500 transition-all shadow-xl backdrop-blur-xl"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  Search
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setActiveTab("explore");
                  window.scrollTo({ top: 600, behavior: "smooth" });
                }}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3"
              >
                <Flame className="w-5 h-5 text-amber-300 animate-bounce" />
                <span>Explore Now</span>
              </button>

              <button
                onClick={() => {
                  if (featuredHeroShow) openModal(featuredHeroShow);
                }}
                className="px-6 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700/80 text-slate-200 hover:text-white font-semibold text-base transition-all duration-200 flex items-center gap-2.5 backdrop-blur-md"
              >
                <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                <span>Featured Showcase</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white flex items-center gap-1">
                  <span>9.9</span>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Top Ratings</p>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  TVMaze
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Live Data API</p>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  100%
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Free Access</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md group">
              {/* Glowing aura under card */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-cyan-500 to-purple-600 rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition duration-700"></div>

              {/* Card container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
                {/* Poster image */}
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <img
                    src={
                      featuredHeroShow.image?.original ||
                      featuredHeroShow.image?.medium ||
                      "https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg"
                    }
                    alt={featuredHeroShow.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-slate-950 flex items-center gap-1 shadow-lg backdrop-blur-sm">
                      <Star className="w-3.5 h-3.5 fill-slate-950" />
                      {featuredHeroShow.rating?.average || 9.5} / 10
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600/90 text-white shadow-lg backdrop-blur-sm">
                      Trending #1
                    </span>
                  </div>
                </div>

                {/* Card Content Footer */}
                <div className="p-5 text-left space-y-3 bg-[#0d1424]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      {featuredHeroShow.name}
                    </h3>
                    <span className="text-xs text-slate-400 font-medium">
                      {featuredHeroShow.premiered
                        ? featuredHeroShow.premiered.slice(0, 4)
                        : "2024"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {(featuredHeroShow.genres || ["Drama", "Crime"])
                      .slice(0, 3)
                      .map((genre) => (
                        <span
                          key={genre}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60"
                        >
                          {genre}
                        </span>
                      ))}
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {featuredHeroShow.summary
                      ? featuredHeroShow.summary.replace(/<[^>]*>?/gm, "")
                      : "An unforgettable saga filled with suspense, drama, and acclaimed performances."}
                  </p>

                  <button
                    onClick={() => openModal(featuredHeroShow)}
                    className="w-full mt-2 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                  >
                    <span>View Show Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
