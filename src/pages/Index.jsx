import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 flex flex-col items-center">
            <img 
              src="/lovable-uploads/007fb876-ab66-430e-9e3c-f32df93159fd.png" 
              alt="iaraHub.IA" 
              className="h-24 w-24 mb-6" 
            />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Bem vindo Digital Lover's</h2>
            <img src="/nttdata-logo.png" alt="NTTDATA" className="h-6 mb-6" />
          </div>
          <form onSubmit={handleLogin} className="p-6 pt-0">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@iarahub.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha:</label>
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
            <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
              Acessar
            </Button>
            <div className="text-center mt-4">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate("/register")}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Não tem uma conta? Registre-se
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;