import React, { createContext, useState, useContext, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import awsConfig from '../config/cognito';

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
      console.log('No user signed in');
      setUser(null);
    }
    setLoading(false);
  }

  async function login() {
    window.location.href = "https://iarahub.auth.us-east-1.amazoncognito.com/login?client_id=5j5l279nm9o6mfss3dm2qrprb1&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fwww.iarahub.com.br%2Fdashboard";
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