import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import MovieListingPage from "./pages/MovieListingPage";
import WatchlistPage from "./pages/WatchlistPage";
import DeveloperPage from "./pages/DeveloperPage";
import MovieModal from "./components/MovieModal";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <MovieProvider>
        <div className="min-h-screen flex flex-col bg-white text-[#00171f] selection:bg-[#00a8e8] selection:text-white">
          <Navbar />
          <main className="flex-1 min-h-[calc(100vh-250px)]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MovieListingPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/developer" element={<DeveloperPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          {/* Global Movie Details Modal */}
          <MovieModal />
          <Footer />
        </div>
      </MovieProvider>
    </BrowserRouter>
  );
}
