import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { ChevronRight } from '@mui/icons-material';
import FeaturedArtworks from '../components/FeaturedArtworks';
import { homeHeroImage, ctaHeroImage } from '../assets';
import { useAuth } from '../contexts/AuthContext';
import './HomePage.css';

function HomePage() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  const stepNumberStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '1.5rem',
    display: 'inline-block',
    position: 'relative',
    zIndex: 10,
    padding: '0 10px',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
  };

  const handleGetStarted = (e) => {
    e.preventDefault();
    if (isSignedIn) {
      navigate('/upload');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-page">
      {}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <img 
            src={homeHeroImage}
            alt="Creative artwork" 
            className="hero-image"
          />
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Where Art Meets
              <span className="hero-animation">
                <TypeAnimation
                  sequence={[
                    'Passion',
                    2000,
                    'Inspiration',
                    2000,
                    'Community',
                    2000,
                    'Discovery',
                    2000,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  className="gradient-text"
                />
              </span>
            </h1>
            <p className="hero-description">
              Upload, showcase, and discover extraordinary artwork from talented 
              creators around the world.
            </p>
            <div className="hero-buttons">
              <Link to="/gallery" className="explore-gallery-btn">
                Explore Gallery <ChevronRight />
              </Link>
              <Link to="/upload" className="btn-secondary">
                Upload Artwork
              </Link>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-button">
            <ChevronRight className="scroll-icon" />
          </div>
        </div>
      </section>
      {}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Artworks</h2>
            <p className="section-description">
              Explore our handpicked selection of extraordinary creations from talented artists around the world.
            </p>
          </div>
          <FeaturedArtworks />
          <div className="section-footer">
            <Link to="/gallery" className="view-all-link">
              View all artworks <ChevronRight />
            </Link>
          </div>
        </div>
      </section>
      {}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Join our community in three simple steps and start sharing your creative vision with the world.
            </p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div style={stepNumberStyle}>1</div>
              <h3 className="step-title">Create an Account</h3>
              <p className="step-description">
                Sign up for free and build your artistic profile to showcase your creative journey.
              </p>
            </div>
            <div className="step-card">
              <div style={stepNumberStyle}>2</div>
              <h3 className="step-title">Upload Your Artwork</h3>
              <p className="step-description">
                Share your masterpieces with our community through our easy-to-use upload system.
              </p>
            </div>
            <div className="step-card">
              <div style={stepNumberStyle}>3</div>
              <h3 className="step-title">Connect & Grow</h3>
              <p className="step-description">
                Engage with fellow artists, receive feedback, and gain exposure for your creative work.
              </p>
            </div>
          </div>
        </div>
      </section>
      {}
      <section className="cta-section">
        <div className="cta-background">
          <div className="cta-overlay"></div>
          <img 
            src={ctaHeroImage}
            alt="Creative space" 
            className="cta-image"
          />
        </div>
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Share Your Artistic Vision?
            </h2>
            <p className="cta-description">
              Join thousands of artists who have found their creative community on ArtistryHub.
            </p>
            <a href="#" onClick={handleGetStarted} className="cta-button">
              Get Started Now <ChevronRight />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;