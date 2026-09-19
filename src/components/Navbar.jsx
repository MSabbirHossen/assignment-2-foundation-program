import React, { useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import {
  Film,
  Clapperboard,
  Heart,
  Search,
  Menu,
  X,
  Compass,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  const { activeTab, setActiveTab, favorites, searchQuery, setSearchQuery } =
    useMovieContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f19]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <div
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  Movie<span className="text-indigo-400">Explorer</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                TV Shows & Blockbusters
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNav("home")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === "home"
                  ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Home
            </button>

            <button
              onClick={() => handleNav("explore")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === "explore"
                  ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Compass className="w-4 h-4" />
              Explore Shows
            </button>

            <button
              onClick={() => handleNav("favorites")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === "favorites"
                  ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${favorites.length > 0 ? "text-rose-400 fill-rose-400" : ""}`}
              />
              Watchlist
              {favorites.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {favorites.length}
                </span>
              )}
            </button>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => handleNav("explore")}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 shadow-md shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
            >
              <Clapperboard className="w-4 h-4 text-white" />
              <span>Browse All Movies</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => handleNav("favorites")}
              className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 relative"
              aria-label="View Favorites"
            >
              <Heart
                className={`w-5 h-5 ${favorites.length > 0 ? "text-rose-400 fill-rose-400" : ""}`}
              />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full bg-rose-500 text-white">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0d1322]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <button
            onClick={() => handleNav("home")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold ${
              activeTab === "home"
                ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Home
          </button>
          <button
            onClick={() => handleNav("explore")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold ${
              activeTab === "explore"
                ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Compass className="w-5 h-5 text-indigo-400" />
            Explore Shows
          </button>
          <button
            onClick={() => handleNav("favorites")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold ${
              activeTab === "favorites"
                ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-rose-400" />
              Watchlist
            </div>
            {favorites.length > 0 && (
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {favorites.length}
              </span>
            )}
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNav("explore")}
              className="w-full py-3 rounded-xl text-center font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <Clapperboard className="w-5 h-5" />
              Browse Movie Listing
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
