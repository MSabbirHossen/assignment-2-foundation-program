import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import { Menu, X } from "lucide-react";

/**
 * Main Application Navigation Bar (SRP & ISP)
 */
export default function Navbar() {
  const { favorites } = useWatchlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 border-2 ${
      isActive
        ? "bg-[#007ea7]/10 text-[#007ea7] border-[#007ea7] shadow-xs"
        : "text-[#003459] border-transparent hover:text-[#007ea7] hover:bg-slate-100"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold border-2 ${
      isActive
        ? "bg-[#007ea7]/10 text-[#007ea7] border-[#007ea7]"
        : "text-[#003459] border-transparent hover:bg-slate-100"
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
          <div className="flex md:hidden items-center gap-3">
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 border-2 border-slate-200 text-[#00171f] hover:text-[#007ea7] shadow-xs cursor-pointer"
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b-2 border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn shadow-lg">
          <NavLink
            to="/"
            end
            onClick={closeMobileMenu}
            className={mobileNavLinkClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            onClick={closeMobileMenu}
            className={mobileNavLinkClass}
          >
            Explore Shows
          </NavLink>
          <NavLink
            to="/watchlist"
            onClick={closeMobileMenu}
            className={mobileNavLinkClass}
          >
            <span>Watchlist</span>
            {favorites.length > 0 && (
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#00a8e8]/20 text-[#007ea7] border border-[#00a8e8]">
                {favorites.length}
              </span>
            )}
          </NavLink>
          <div className="pt-2">
            <Link
              to="/movies"
              onClick={closeMobileMenu}
              className="w-full py-3 rounded-xl text-center font-bold text-white bg-[#007ea7] hover:bg-[#003459] border-2 border-[#003459] shadow-md block"
            >
              Browse Movie Listing
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
