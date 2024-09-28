import React, { createContext, useState, useContext, useEffect } from 'react';
import { Auth } from '@aws-amplify/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);
    } catch (err) {
      setUser(null);
    }
    setLoading(false);
  }

  async function login(email, password) {
    try {
      const user = await Auth.signIn(email, password);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out: ', error);
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

export const useAuth = () => useContext(AuthContext);