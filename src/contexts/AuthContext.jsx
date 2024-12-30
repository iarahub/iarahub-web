import React, { createContext, useState, useContext } from 'react';
import { toast } from "sonner";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  async function login(email, password) {
    setLoading(true);
    try {
      const response = await fetch('https://bff-iarahub.vercel.app/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao realizar login');
      }

      setUser(data.user);
      setToken(data.token);
      toast.success(data.message || "Login realizado com sucesso!");
      return data.user;
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(error.message || "Falha ao realizar login");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setUser(null);
    setToken(null);
    toast.success("Logout realizado com sucesso!");
  }

  const value = {
    user,
    token,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};