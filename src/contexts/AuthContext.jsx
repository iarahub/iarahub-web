import React, { createContext, useState, useContext, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { signIn, signOut, getCurrentUser } from 'aws-amplify/auth';

// Update the configuration
const awsConfig = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_bmO9UTdOf',
    userPoolWebClientId: '4810mtji22ul6ahbdi6urrvtaa',
    // Remove the OAuth configuration if you're not using it
  }
};

Amplify.configure(awsConfig);

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