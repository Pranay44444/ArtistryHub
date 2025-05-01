import React, { createContext, useContext, useEffect, useState } from 'react';
import { useClerk, useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

const UserAuthContext = createContext();

export const useAuth = () => {
  const authContext = useContext(UserAuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return authContext;
};

export const AuthProvider = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useClerkAuth();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authenticationError, setAuthenticationError] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      setIsAuthLoading(false);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isSignedIn !== undefined) {
      setAuthenticationError(null);
    }
  }, [isSignedIn]);

  const handleUserSignOut = async () => {
    try {
      setIsAuthLoading(true);
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error.message);
      setAuthenticationError('Failed to sign out. Please try again.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const fetchUserAuthToken = async () => {
    try {
      return await getToken();
    } catch (error) {
      console.error('Failed to get user token:', error);
      setAuthenticationError('Failed to authenticate. Please sign in again.');
      return null;
    }
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    
    if (user.firstName) return user.firstName;
    
    if (user.username) return user.username;
    
    if (user.emailAddresses && user.emailAddresses.length > 0) {
      const email = user.emailAddresses[0].emailAddress;
      return email.split('@')[0];
    }
    
    return 'User';
  };

  const authContextValue = {
    user,
    isSignedIn,
    loading: isAuthLoading,
    authError: authenticationError,
    signOut: handleUserSignOut,
    getToken: fetchUserAuthToken,
    getDisplayName: getUserDisplayName
  };

  return (
    <UserAuthContext.Provider value={authContextValue}>
      {children}
    </UserAuthContext.Provider>
  );
};