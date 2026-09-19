import React from "react";
import { MovieProvider, useMovieContext } from "./context/MovieContext";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import FeaturedShows from "./components/FeaturedShows";
import MovieListingView from "./components/MovieListingView";
import WatchlistView from "./components/WatchlistView";
import MovieModal from "./components/MovieModal";
import Footer from "./components/Footer";

function MainContent() {
  const { activeTab } = useMovieContext();

  return (
    <main className="min-h-[calc(100vh-250px)]">
      {activeTab === "home" && (
        <>
          <HeroBanner />
          <FeaturedShows />
          <MovieListingView />
        </>
      )}

      {activeTab === "explore" && (
        <div className="pt-4">
          <MovieListingView />
        </div>
      )}

      {activeTab === "favorites" && <WatchlistView />}

      {/* Global Movie Details Modal */}
      <MovieModal />
    </main>
  );
}

export default function App() {
  return (
    <MovieProvider>
      <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <div className="flex-1">
          <MainContent />
        </div>
        <Footer />
      </div>
    </MovieProvider>
  );
}
