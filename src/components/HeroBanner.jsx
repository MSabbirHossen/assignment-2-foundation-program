import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import { Search, Flame, Play, Star, Sparkles, TrendingUp } from "lucide-react";

export default function HeroBanner() {
  const { setSearchQuery, topRatedShows, openModal } = useMovieContext();
  const [localSearch, setLocalSearch] = useState("");
  const navigate = useNavigate();

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
    }
    navigate("/movies");
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
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Background Soft Gradients & Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-[#00a8e8]/10 via-[#007ea7]/5 to-[#003459]/5 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute -top-24 right-10 w-80 h-80 bg-[#00a8e8]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-4 w-72 h-72 bg-[#007ea7]/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Typography & CTA */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#007ea7]/10 border border-[#007ea7]/25 text-xs font-bold text-[#007ea7] shadow-xs animate-pulse-glow">
              <Sparkles className="w-3.5 h-3.5 text-[#00a8e8]" />
              <span>OVER 50,000+ TV SHOWS & MOVIES LIVE</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-almendra text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider leading-[1.15] text-[#00171f]">
              DISCOVER{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8]">
                MOVIES
              </span>{" "}
              & EPIC SHOWS
            </h1>

            {/* Description */}
            <p className="font-architects text-lg sm:text-xl text-[#003459]/80 max-w-xl leading-relaxed font-normal">
              Explore and discover your favorite movies and television series
              from around the world. Search instantly by title, filter by
              genres, and dive into cast details and summaries.
            </p>

            {/* Interactive Search Bar within Hero */}
            <form onSubmit={handleHeroSearchSubmit} className="max-w-xl">
              <div className="relative flex items-center group">
                <div className="absolute left-4 pointer-events-none text-[#007ea7] group-focus-within:text-[#003459] transition-colors">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search for Breaking Bad, Stranger Things, Anime..."
                  className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#007ea7]/50 focus:border-[#007ea7] text-[#00171f] placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none focus:ring-4 focus:ring-[#007ea7]/15 transition-all shadow-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#003459] to-[#007ea7] hover:from-[#00171f] hover:to-[#003459] text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  Search
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/movies"
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8] hover:from-[#00171f] hover:to-[#003459] text-white font-bold text-base shadow-lg shadow-[#007ea7]/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3"
              >
                <Flame className="w-5 h-5 text-amber-300 animate-bounce" />
                <span>Explore Now</span>
              </Link>

              <button
                onClick={() => {
                  if (featuredHeroShow) openModal(featuredHeroShow);
                }}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-[#003459] hover:text-[#00171f] font-semibold text-base transition-all duration-200 flex items-center gap-2.5 shadow-sm"
              >
                <Play className="w-4 h-4 text-[#007ea7] fill-[#007ea7]" />
                <span>Featured Showcase</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200 max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#00171f] flex items-center gap-1">
                  <span>9.9</span>
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <p className="text-xs text-[#003459]/70 font-semibold mt-0.5">
                  Top Ratings
                </p>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#00171f]">
                  TVMaze
                </div>
                <p className="text-xs text-[#003459]/70 font-semibold mt-0.5">
                  Live Data API
                </p>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#00171f]">
                  100%
                </div>
                <p className="text-xs text-[#003459]/70 font-semibold mt-0.5">
                  Free Access
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md group">
              {/* Glowing aura under card */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8] rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-700"></div>

              {/* Card container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xl">
                {/* Poster image */}
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-slate-900">
                  <img
                    src={
                      featuredHeroShow.image?.original ||
                      featuredHeroShow.image?.medium ||
                      "https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg"
                    }
                    alt={featuredHeroShow.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00171f] via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00171f]/85 text-[#3fcfff] border border-[#00a8e8]/40 flex items-center gap-1 shadow-md backdrop-blur-sm">
                      <Star className="w-3.5 h-3.5 fill-[#3fcfff]" />
                      {featuredHeroShow.rating?.average || 9.5} / 10
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#007ea7] text-white shadow-md">
                      Trending #1
                    </span>
                  </div>
                </div>

                {/* Card Content Footer */}
                <div className="p-5 text-left space-y-3 bg-white">
                  <div className="flex items-center justify-between">
                    <h3 className="font-almendra text-xl sm:text-2xl font-bold text-[#00171f] tracking-wider">
                      {featuredHeroShow.name}
                    </h3>
                    <span className="text-xs text-[#007ea7] font-bold">
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
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#007ea7]/10 text-[#003459] border border-[#007ea7]/20"
                        >
                          {genre}
                        </span>
                      ))}
                  </div>

                  <p className="font-architects text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {featuredHeroShow.summary
                      ? featuredHeroShow.summary.replace(/<[^>]*>?/gm, "")
                      : "An unforgettable saga filled with suspense, drama, and acclaimed performances."}
                  </p>

                  <button
                    onClick={() => openModal(featuredHeroShow)}
                    className="w-full mt-2 py-2.5 rounded-xl font-semibold text-sm bg-[#007ea7] hover:bg-[#003459] text-white transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#007ea7]/20"
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
