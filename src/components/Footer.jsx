import React from "react";
import { Film, Heart, ArrowUp, Globe, Sparkles } from "lucide-react";
import { useMovieContext } from "../context/MovieContext";

export default function Footer() {
  const { setActiveTab } = useMovieContext();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#070a12] text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Movie<span className="text-indigo-400">Explorer</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Your ultimate gateway to exploring top movies, TV series,
              blockbusters, and cast details with real-time ratings powered by
              the TVMaze API.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    setActiveTab("home");
                    scrollToTop();
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab("explore");
                    scrollToTop();
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Browse Movie Listing
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab("favorites");
                    scrollToTop();
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  My Saved Watchlist
                </button>
              </li>
            </ul>
          </div>

          {/* API & Technologies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Data & Source
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Powered by{" "}
              <a
                href="https://www.tvmaze.com/api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline font-semibold"
              >
                TVMaze API
              </a>
              . Fast, open, and free movie & television data.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter profile"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <button
                onClick={scrollToTop}
                title="Scroll to top"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 border border-slate-800 text-slate-300 hover:text-white transition-all ml-auto"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 MovieExplorer. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with{" "}
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> using
            React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
