import React, { createContext, useContext } from 'react';
import { lightTheme } from '../theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const theme = lightTheme;
  
  return (
    <ThemeContext.Provider value={{ theme }}>
      {typeof children === 'function' ? children(theme) : children}
    </ThemeContext.Provider>
  );
};