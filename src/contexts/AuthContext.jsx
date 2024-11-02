import React, { createContext, useState, useContext, useEffect } from 'react';
import { signOut, getCurrentUser } from '@aws-amplify/auth';
import { toast } from "sonner";

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
    } catch (error) {
      setUser(null);
      window.location.href = 'https://iarahub.auth.us-east-1.amazoncognito.com/login?client_id=6cngethoqj384g4qel80h99kgt&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fwww.iarahub.com.br%2Fdashboard';
    } finally {
      setLoading(false);
    }
  }

  async function login() {
    window.location.href = 'https://iarahub.auth.us-east-1.amazoncognito.com/login?client_id=6cngethoqj384g4qel80h99kgt&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fwww.iarahub.com.br%2Fdashboard';
  }

  async function logout() {
    try {
      await signOut();
      setUser(null);
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error("Erro ao realizar logout.");
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