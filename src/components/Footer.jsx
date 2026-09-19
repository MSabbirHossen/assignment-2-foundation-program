import React from "react";
import { Link } from "react-router-dom";
import DeveloperFooterInfo from "./DeveloperFooterInfo";
import { Film, Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    { to: "/", label: "Home" },
    { to: "/watchlist", label: "My Watchlist" },
    { to: "/movies", label: "Browse Movies" },
    { to: "/developer", label: "Developer Profile" }
  ]
  return (
    <footer className="border-t border-[#003459] bg-[#00171f] text-slate-300 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link
              to="/"
              onClick={scrollToTop}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#003459] via-[#007ea7] to-[#00a8e8] flex items-center justify-center shadow-lg shadow-[#007ea7]/25">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Movie<span className="text-[#00a8e8]">Explorer</span>
              </span>
            </Link>
            <p className="text-slate-300 text-sm max-w-sm leading-relaxed">
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
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={scrollToTop}
                    className="hover:text-[#00a8e8] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* API & Technologies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Data & Source
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Powered by{" "}
              <a
                href="https://www.tvmaze.com/api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00a8e8] hover:underline font-semibold"
              >
                TVMaze API
              </a>
              . Fast, open, and free movie & television data.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/MSabbirHossen"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className="p-2.5 rounded-xl bg-[#003459] hover:bg-[#007ea7] border border-white/10 text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/sabb1rhossen"
                target="_blank"
                rel="noopener noreferrer"
                aria-label=" Facebook profile"
                className="p-2.5 rounded-xl bg-[#003459] hover:bg-[#007ea7] border border-white/10 text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <button
                onClick={scrollToTop}
                title="Scroll to top"
                className="p-2.5 rounded-xl bg-[#003459] hover:bg-[#007ea7] border border-white/10 text-white transition-all ml-auto cursor-pointer"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}

        <DeveloperFooterInfo />
        <p className="text-center text-slate-300 mt-5 font-architects ">© 2026 MovieExplorer. All rights reserved.</p>
      </div>
    </footer>
  );
}
