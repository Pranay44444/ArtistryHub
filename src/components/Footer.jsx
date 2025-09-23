import React from 'react';
import { Instagram, Twitter, Facebook, Mail } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logo.png';
import './Footer.css';
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="footer-logo">
              <img src={logoImage} alt="ArtistryHub Logo" className="logo-image" />
            </div>
            <p className="footer-description">
              A platform for artists to share and discover creative works.
            </p>
            <div className="social-links">
              <a href="https://instagram.com" className="social-link" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="https://twitter.com" className="social-link" aria-label="Twitter">
                <Twitter />
              </a>
              <a href="https://facebook.com" className="social-link" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="mailto:chitarepranay85@gmail.com" className="social-link" aria-label="Email">
                <Mail />
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li><Link to="/gallery" className="footer-link">Gallery</Link></li>
              <li><Link to="/upload" className="footer-link">Upload</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Community</h4>
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><a href="mailto:chitarepranay85@gmail.com" className="footer-link">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ArtistryHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;