import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import GalleryPage from '../pages/GalleryPage';
import ArtworkSubmissionPage from '../pages/ArtworkSubmissionPage';
import ArtworkDetailPage from '../pages/ArtworkDetailPage';
import ArtistProfilePage from '../pages/ArtistProfilePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import AboutPage from '../pages/AboutPage';
import ProtectedRoute from './ProtectedRoute';

function SiteNavigationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/upload" element={
        <ProtectedRoute>
          <ArtworkSubmissionPage />
        </ProtectedRoute>
      } />
      <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
      <Route path="/artist/:id" element={<ArtistProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default SiteNavigationRoutes;