import React, { createContext, useState, useContext } from 'react';
import { toast } from "sonner";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lista de usuários permitidos
  const allowedUsers = [
    { email: 'marina.santiago@nttdata.com', name: 'Marina Santiago' },
    { email: 'admin@nttdata.com', name: 'Admin' }
  ];

  async function login(email, password) {
    setLoading(true);
    try {
      const user = allowedUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (user) {
        setUser(user);
        toast.success("Login realizado com sucesso!");
        return user;
      } else {
        toast.error("Usuário não encontrado.");
        throw new Error("Usuário não encontrado");
      }
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setUser(null);
    toast.success("Logout realizado com sucesso!");
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