import React, { createContext, useState, useContext, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { signIn, signOut, getCurrentUser } from 'aws-amplify/auth';
import awsConfig from '../config/cognito';

// Remove OAuth configuration if not needed
const configWithoutOAuth = {
  ...awsConfig,
  oauth: undefined
};

try {
  Amplify.configure(configWithoutOAuth);
} catch (error) {
  console.error("Error configuring Amplify:", error);
}

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
      console.error("Error checking user:", err);
      setUser(null);
    }
    setLoading(false);
  }

  async function login(username, password) {
    try {
      const user = await signIn({ 
        username, 
        password,
        options: {
          clientSecret: awsConfig.Auth.clientSecret
        }
      });
      setUser(user);
      return user;
    } catch (error) {
      console.error("Error signing in: ", error);
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