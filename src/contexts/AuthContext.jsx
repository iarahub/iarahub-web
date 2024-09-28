import React, { createContext, useState, useContext, useEffect } from 'react';
import { Amplify } from '@aws-amplify/core';
import { signIn, signOut, getCurrentUser } from '@aws-amplify/auth';
import awsConfig from '../config/cognito';

// Update Amplify configuration with OAuth settings
Amplify.configure({
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: window.location.origin,
    redirectSignOut: window.location.origin
  }
});

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (err) {
      setUser(null);
    }
    setLoading(false);
  }

  async function login(username, password) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      if (isSignedIn) {
        const userData = await getCurrentUser();
        setUser(userData);
        return userData;
      }
      return nextStep;
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  }

  const value = {
    user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};