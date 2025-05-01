import React from 'react';
import aboutHeroImage from '../assets/about-hero.jpg';
import './AboutPage.css';
function AboutPage() {
  return (
    <div className="about-page">
      {}
      <section className="about-intro-section">
        <div className="container">
          <div className="about-intro-content">
            <h1 className="about-title">About ArtistryHub</h1>
            <p className="about-description">
              ArtistryHub empowers artists to showcase, share, and connect through their creative work.
              We are a community-driven platform focused on elevating artistic voices from around the globe.
            </p>
          </div>
        </div>
      </section>
      {}
      <section className="about-mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-content">
              <h2 className="section-title">Our Mission</h2>
              <p className="mission-text">
                At ArtistryHub, we believe in the power of art to inspire, transform, and connect us all. 
                Our platform serves as a global gallery where artists of all backgrounds can find their audience 
                and art enthusiasts can discover new perspectives.
              </p>
              <p className="mission-text">
                We're dedicated to creating a supportive ecosystem where creativity thrives and artists receive 
                the recognition they deserve. Through innovative technology and thoughtful community building, 
                we're making art more accessible than ever before.
              </p>
            </div>
            <div className="mission-image-container">
              <img 
                src={aboutHeroImage}
                alt="Artists collaborating" 
                className="mission-image"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default AboutPage; 