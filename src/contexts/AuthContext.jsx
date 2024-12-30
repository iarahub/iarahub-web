import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "sonner";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  // Apply theme based on user's enterprise
  useEffect(() => {
    if (user?.enterprise) {
      console.log('Applying theme for enterprise:', user.enterprise);
      const root = document.documentElement;
      
      switch (user.enterprise.toUpperCase()) {
        case 'IARA':
          root.style.setProperty('--primary', '#9b87f5');
          root.style.setProperty('--primary-dark', '#7E69AB');
          break;
        case 'ITAU':
          root.style.setProperty('--primary', '#F97316');
          root.style.setProperty('--primary-dark', '#EA580C');
          break;
        case 'NTTDATA':
          root.style.setProperty('--primary', '#0EA5E9');
          root.style.setProperty('--primary-dark', '#0284C7');
          break;
        case 'ZUP':
          root.style.setProperty('--primary', '#22C55E');
          root.style.setProperty('--primary-dark', '#16A34A');
          break;
        default:
          // Default theme (NTTDATA blue)
          root.style.setProperty('--primary', '#0EA5E9');
          root.style.setProperty('--primary-dark', '#0284C7');
      }
    }
  }, [user]);

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
    // Reset theme to default
    const root = document.documentElement;
    root.style.setProperty('--primary', '#0EA5E9');
    root.style.setProperty('--primary-dark', '#0284C7');
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