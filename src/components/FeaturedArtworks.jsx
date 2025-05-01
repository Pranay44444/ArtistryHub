import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Visibility } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { artworkOriginals } from '../assets';
import './FeaturedArtworks.css';
const featuredArtworks = [
  {
    id: 1,
    title: "Abstract Harmony",
    artist: "Jorge",
    artistId: 101,
    imageUrl: artworkOriginals.artwork1,
    views: 1205
  },
  {
    id: 9,
    title: "Cityscape at Dusk",
    artist: "Leo",
    artistId: 109,
    imageUrl: artworkOriginals.artwork9,
    views: 1980
  },
  {
    id: 3,
    title: "Urban Expressions",
    artist: "Tanya",
    artistId: 103,
    imageUrl: artworkOriginals.artwork3,
    views: 1780
  },
  {
    id: 7,
    title: "Fractured Reality",
    artist: "David",
    artistId: 107,
    imageUrl: artworkOriginals.artwork7,
    views: 1842
  },
  {
    id: 8,
    title: "Painting Patterns",
    artist: "Omar",
    artistId: 108,
    imageUrl: artworkOriginals.artwork8,
    views: 1689
  }
];
function FeaturedArtworks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredArtworks.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };
  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredArtworks.length) % featuredArtworks.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);
  return (
    <div className="featured-artworks">
      <div className="slider-container">
        <AnimatePresence mode="wait">
          {featuredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              className={`slide ${index === currentIndex ? 'active' : ''}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: index === currentIndex ? 1 : 0, x: index === currentIndex ? 0 : -100 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="slide-image"
              />
              <div className="slide-overlay"></div>
              <div className="slide-content">
                <h3 className="slide-title">{artwork.title}</h3>
                <Link 
                  to={`/artist/${artwork.artistId}`}
                  className="artist-link"
                >
                  By {artwork.artist}
                </Link>
                <div className="slide-actions">
                  <button className="views-button">
                    <Visibility fontSize="small" /> {artwork.views}
                  </button>
                  <Link
                    to={`/artwork/${artwork.id}`}
                    className="view-button"
                  >
                    View Artwork
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        onClick={prevSlide}
        className="nav-button prev"
        disabled={isAnimating}
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="nav-button next"
        disabled={isAnimating}
      >
        <ChevronRight />
      </button>
      <div className="dots">
        {featuredArtworks.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
export default FeaturedArtworks;