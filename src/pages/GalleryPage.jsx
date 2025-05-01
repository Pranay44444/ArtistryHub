import React, { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import ArtworkGrid from '../components/ArtworkGrid';
import './GalleryPage.css';

function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    styles: [],
    sortBy: 'recent'
  });
  const categories = [
    'Digital Art', 'Painting', 'Photography', 'Sculpture', 
    'Illustration', 'Mixed Media', 'Conceptual', 'Abstract'
  ];
  const styles = [
    'Modern', 'Contemporary', 'Minimalist', 'Surrealism', 
    'Impressionism', 'Pop Art', 'Street Art', 'Traditional'
  ];
  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'trending', label: 'Trending' }
  ];
  const toggleCategory = (category) => {
    setFilters(prev => {
      if (prev.categories.includes(category)) {
        return { ...prev, categories: prev.categories.filter(c => c !== category) };
      } else {
        return { ...prev, categories: [...prev.categories, category] };
      }
    });
  };
  const toggleStyle = (style) => {
    setFilters(prev => {
      if (prev.styles.includes(style)) {
        return { ...prev, styles: prev.styles.filter(s => s !== style) };
      } else {
        return { ...prev, styles: [...prev.styles, style] };
      }
    });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };
  const clearFilters = () => {
    setFilters({
      categories: [],
      styles: [],
      sortBy: 'recent'
    });
    setSearchQuery('');
  };
  return (
    <div className="gallery-page">
      <div className="gallery-container">
        <div className="gallery-header">
          <h1 className="gallery-title">Discover Amazing Artwork</h1>
          <p className="gallery-description">
            Explore thousands of unique creations from talented artists around the world.
          </p>
        </div>
        <div className="search-filter-bar">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by artwork title, artist, or keywords..."
                  className="search-input"
                title={searchQuery}
                />
                <Search className="search-icon" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="clear-search"
                  >
                    <X />
                  </button>
                )}
              </div>
            </form>
        </div>
        <ArtworkGrid filters={filters} searchQuery={searchQuery} />
      </div>
    </div>
  );
}
export default GalleryPage;