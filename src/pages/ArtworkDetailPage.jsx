import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, 
  FaSearch, FaEye, FaComment, FaCalendarAlt, FaTimes, 
  FaShareAlt, FaArrowLeft, FaCreditCard
} from 'react-icons/fa';
import './ArtworkDetailPage.css';
import { 
  Favorite, Share, BookmarkAdd, ChatBubbleOutline, 
  Person, ChevronRight, ChevronLeft, RemoveRedEye, 
  CalendarToday, GetApp, Close 
} from '@mui/icons-material';
import { useArtworks } from '../contexts/ArtworksContext';
import { useAuth } from '../contexts/AuthContext';

function ArtworkDetailPage() {
  const { id } = useParams();
  const { getArtwork, trackView } = useArtworks();
  const { isSignedIn, user, getDisplayName } = useAuth();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreenView, setIsFullscreenView] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [viewCountUpdated, setViewCountUpdated] = useState(false);
  const prevViewsRef = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const numericId = parseInt(id);
    const foundArtwork = getArtwork(numericId);
    if (foundArtwork) {
      if (prevViewsRef.current > 0 && prevViewsRef.current < foundArtwork.views) {
        setViewCountUpdated(true);
        setTimeout(() => setViewCountUpdated(false), 2000); 
      }
      prevViewsRef.current = foundArtwork.views;
      setArtwork(foundArtwork);
      if (isSignedIn && user) {
        const userId = user.id || user.email || getDisplayName();
        trackView(numericId, userId);
      }
    }
    setLoading(false);
    window.scrollTo(0, 0);
  }, [id, getArtwork, isSignedIn, user, trackView, getDisplayName]);

  const toggleFullscreen = () => {
    setIsFullscreenView(prev => !prev);
  };

  const handleBuyNow = () => {
    setShowPurchaseModal(true);
  };

  const handleClosePurchaseModal = () => {
    setShowPurchaseModal(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="not-found-container">
        <div className="not-found-content">
          <h2 className="not-found-title">Artwork Not Found</h2>
          <p className="not-found-message">The artwork you're looking for doesn't exist or has been removed.</p>
          <Link to="/gallery" className="not-found-link">
            Return to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {}
      {isFullscreenView && (
        <div className="fullscreen-modal">
          <button onClick={toggleFullscreen} className="close-fullscreen">
            <Close />
          </button>
          <img
            src={artwork.fullImageUrl || artwork.imageUrl}
            alt={artwork.title}
            className="fullscreen-image"
          />
        </div>
      )}
      {}
      {showPurchaseModal && (
        <div className="purchase-modal">
          <div className="purchase-modal-content">
            <button onClick={handleClosePurchaseModal} className="close-modal">
              <Close />
            </button>
            <h2 className="modal-title">Complete Your Purchase</h2>
            <div className="purchase-details">
              <img 
                src={artwork.imageUrl} 
                alt={artwork.title} 
                className="purchase-thumbnail" 
              />
              <div className="purchase-info">
                <h3>{artwork.title}</h3>
                <p>By {artwork.artist}</p>
                <p className="purchase-price">₹{artwork.price ? Math.round(artwork.price) : '299'}</p>
              </div>
            </div>
            <div className="purchase-actions">
              <button className="purchase-button">
                Proceed to Payment
              </button>
              <button onClick={handleClosePurchaseModal} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="artwork-detail-page">
        <div className="container">
          {}
          <div className="breadcrumbs">
            <nav className="breadcrumbs-nav">
              <ol className="breadcrumbs-list">
                <li>
                  <Link to="/" className="breadcrumb-link">Home</Link>
                </li>
                <li>
                  <ChevronRight className="breadcrumb-separator" />
                  <Link to="/gallery" className="breadcrumb-link">Gallery</Link>
                </li>
                <li>
                  <ChevronRight className="breadcrumb-separator" />
                  <span className="breadcrumb-current">{artwork.title}</span>
                </li>
              </ol>
            </nav>
          </div>
          <div className="artwork-detail-grid">
            {}
            <div className="artwork-main-content">
              <div className="artwork-image-section">
                <div className="artwork-image-wrapper" onClick={toggleFullscreen}>
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="artwork-image"
                  />
                </div>
              </div>
            </div>
            {}
            <div className="artwork-sidebar">
              {}
              <div className="artist-simple-card">
                <h3 className="artist-name">By {artwork.artist}</h3>
              </div>
              {}
              <div className="artwork-info-card">
                <h1 className="artwork-title">{artwork.title}</h1>
                <p className="artwork-description">{artwork.description}</p>
                <div className="artwork-metadata">
                  <div className="metadata-item">
                    <span className="metadata-label">Category:</span>
                    <span className="metadata-value">{artwork.category}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Style:</span>
                    <span className="metadata-value">{artwork.style}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Date:</span>
                    <span className="metadata-value">
                      {new Date(artwork.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Views:</span>
                    <span className={`metadata-value ${viewCountUpdated ? 'view-count-updated' : ''}`}>
                      {artwork.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              {}
              <div className="buy-section">
                <div className="price-container">
                  <span className="price-label">Price</span>
                  <span className="price-value">₹{artwork.price ? Math.round(artwork.price) : '299'}</span>
                </div>
                <div className="buy-actions">
                  <button className="buy-now-button" onClick={handleBuyNow}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtworkDetailPage;