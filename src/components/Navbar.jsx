import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import { Menu, X } from "lucide-react";

/**
 * Main Application Navigation Bar (SRP & ISP)
 */
export default function Navbar() {
  const { favorites } = useWatchlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 border-2 ${isActive
      ? "bg-[#007ea7]/10 text-[#007ea7] border-[#007ea7] shadow-xs"
      : "text-[#003459] border-transparent hover:text-[#007ea7] hover:bg-slate-100"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-bold border-2 transition-all ${isActive
      ? "bg-[#007ea7]/15 text-[#007ea7] border-[#007ea7] shadow-xs"
      : "text-[#00171f] bg-slate-50 border-slate-200 hover:border-[#007ea7] hover:text-[#007ea7]"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-slate-200 bg-white shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-[#00171f]">
                  Movie<span className="text-[#007ea7]">Explorer</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#007ea7]/10 text-[#007ea7] border border-[#007ea7]">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-[#003459]/70 font-medium tracking-wide">
                TV Shows & Blockbusters
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/movies" className={navLinkClass}>
              Explore Shows
            </NavLink>

            <NavLink to="/watchlist" className={navLinkClass}>
              <span>Watchlist</span>
              {favorites.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#00a8e8]/20 text-[#007ea7] border border-[#00a8e8]">
                  {favorites.length}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/movies"
              className="relative group px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#007ea7] hover:bg-[#003459] border-2 border-[#003459] shadow-md hover:shadow-lg transition-all duration-200"
            >
              Browse All Movies
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/watchlist"
              onClick={closeMobileMenu}
              className="px-3 py-1.5 rounded-xl bg-slate-100 border-2 border-slate-200 text-[#003459] font-bold text-xs relative shadow-xs flex items-center gap-1"
              aria-label="View Favorites"
            >
              <span>Watchlist</span>
              {favorites.length > 0 && (
                <span className="w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full bg-[#007ea7] text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 text-[#00171f] hover:text-[#007ea7] shadow-xs cursor-pointer transition-colors"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Blurred Backdrop & 80% Width Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Blurred Backdrop Overlay */}
          <div
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-[#00171f]/60 backdrop-blur-md transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* 80% Width Mobile Menu Panel */}
          <aside
            className="relative w-[80vw] max-w-[380px] h-full bg-white z-10 shadow-2xl border-l-2 border-slate-200 flex flex-col justify-between p-6 overflow-y-auto drawer-enter"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Top Header of Drawer: Brand + Close Button */}
            <div className="flex items-center justify-between pb-5 border-b-2 border-slate-200">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-[#00171f]">
                    Movie<span className="text-[#007ea7]">Explorer</span>
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#007ea7]/10 text-[#007ea7] border border-[#007ea7]">
                    PRO
                  </span>
                </div>
                <p className="font-roboto text-xs text-[#003459]/70 mt-0.5">
                  Navigation Menu
                </p>
              </div>

              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#00171f] hover:text-[#007ea7] border-2 border-slate-200 transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links Section */}
            <div className="py-6 space-y-3 flex-1">
              <div className="text-[11px] font-bold text-[#007ea7] tracking-wider uppercase mb-1">
                Navigation
              </div>

              <NavLink
                to="/"
                end
                onClick={closeMobileMenu}
                className={mobileNavLinkClass}
              >
                <span>Home</span>
                <span className="text-xs text-slate-400 font-mono">01</span>
              </NavLink>

              <NavLink
                to="/movies"
                onClick={closeMobileMenu}
                className={mobileNavLinkClass}
              >
                <span>Explore Shows</span>
                <span className="text-xs text-slate-400 font-mono">02</span>
              </NavLink>

              <NavLink
                to="/watchlist"
                onClick={closeMobileMenu}
                className={mobileNavLinkClass}
              >
                <div className="flex items-center gap-2">
                  <span>My Watchlist</span>
                  {favorites.length > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#00a8e8]/20 text-[#007ea7] border border-[#00a8e8]">
                      {favorites.length}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400 font-mono">03</span>
              </NavLink>
            </div>

            {/* Bottom Drawer CTA */}
            <div className="pt-6 border-t-2 border-slate-200 space-y-3">
              <Link
                to="/movies"
                onClick={closeMobileMenu}
                className="w-full py-3.5 px-4 rounded-xl text-center font-bold text-sm text-white bg-[#007ea7] hover:bg-[#003459] border-2 border-[#003459] shadow-md block transition-colors"
              >
                Browse All Movies
              </Link>
              <p className="font-roboto text-[11px] text-center text-slate-500">
                Over 50,000+ TV Shows & Movies
              </p>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
