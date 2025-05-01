import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Bookmark, Share2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useArtworks } from '../contexts/ArtworksContext';
import './ArtworkGrid.css';

function ArtworkGrid({ filters, searchQuery }) {
  const { theme } = useTheme();
  const { artworks } = useArtworks();
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    let filtered = [...artworks];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        art => 
          art.title.toLowerCase().includes(query) || 
          art.artist.toLowerCase().includes(query) ||
          art.category.toLowerCase().includes(query) ||
          art.style.toLowerCase().includes(query)
      );
    }
    if (filters.categories.length > 0) {
      filtered = filtered.filter(art => 
        filters.categories.includes(art.category)
      );
    }
    if (filters.styles.length > 0) {
      filtered = filtered.filter(art => 
        filters.styles.includes(art.style)
      );
    }
    switch (filters.sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'trending':
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }
    setFilteredArtworks(filtered);
    setLoading(false);
    setPage(1);
    setHasMore(filtered.length > 0);
  }, [searchQuery, filters, artworks]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [hasMore]);

  useEffect(() => {
    if (gridRef.current && filteredArtworks.length > 0) {
      console.log('Grid container:', gridRef.current);
      console.log('Grid item count:', gridRef.current.querySelectorAll('.artwork-item').length);
      console.log('Artwork count:', filteredArtworks.length);
    }
  }, [filteredArtworks, gridRef.current]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (filteredArtworks.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">
          <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="no-results-title">No artworks found</h3>
        <p className="no-results-message">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="artwork-grid-container" style={{width: '100%'}}>
      <div className="artwork-grid" ref={gridRef} style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>
        {filteredArtworks.map(artwork => (
          <div key={artwork.id} className="artwork-item" style={{width: '100%'}}>
            <div className="artwork-card">
              <Link to={`/artwork/${artwork.id}`} className="artwork-link">
                <div className="artwork-image-container">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="artwork-image"
                    loading="lazy"
                  />
                  <div className="artwork-category">
                    {artwork.category}
                  </div>
                  <div className="artwork-overlay">
                    <h3 className="artwork-title">{artwork.title}</h3>
                    <p className="artwork-artist">By {artwork.artist}</p>
                    <div className="artwork-views">
                      <Eye size={16} /> <span>{artwork.views}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div ref={loadingRef} className="loading-more">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}

export default ArtworkGrid;