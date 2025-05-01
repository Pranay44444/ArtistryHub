import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';
import { ArtworksProvider } from './contexts/ArtworksContext';
import SiteNavigationRoutes from './routes/SiteNavigationRoutes';
import SiteHeader from './components/Header';
import SiteFooter from './components/Footer';
import './index.css';

function ArtistryHubApp() {
  return (
    <AuthProvider>
      <CustomThemeProvider>
        {(themeSettings) => (
          <ThemeProvider theme={themeSettings}>
            <CssBaseline />
            <ArtworksProvider>
              <div className="application-container">
                <SiteHeader />
                <main className="main-content-area">
                  <SiteNavigationRoutes />
                </main>
                <SiteFooter />
              </div>
            </ArtworksProvider>
          </ThemeProvider>
        )}
      </CustomThemeProvider>
    </AuthProvider>
  );
}

export default ArtistryHubApp;