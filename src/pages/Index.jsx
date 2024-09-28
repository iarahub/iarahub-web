import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.trim() !== '' && password.trim() !== '') {
      try {
        await login(email, password);
        navigate('/dashboard');
      } catch (error) {
        toast.error(error.message || "An error occurred during login.");
      }
    } else {
      toast.error("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-primary p-4 flex items-center">
            <img src="/logo.png" alt="iaraHub.IA" className="h-8 mr-2" />
            <h1 className="text-white text-xl font-bold">iaraHub.IA</h1>
          </div>
          <form onSubmit={handleLogin} className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">Bem vindo Digital Lover's</h2>
              <img src="/nttdata-logo.png" alt="NTTDATA" className="h-6 mx-auto mt-2" />
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">email:</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="marina.santiago@nttdata.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">senha:</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6 bg-primary hover:bg-primary-dark">
              Acessar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;