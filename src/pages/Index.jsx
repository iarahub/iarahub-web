import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-blue-600 p-4 flex items-center">
            <img src="/logo.png" alt="iaraHub.IA" className="h-8 mr-2" />
            <h1 className="text-white text-xl font-bold">iaraHub.IA</h1>
          </div>
          <div className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">Bem vindo Digital Lover's</h2>
              <img src="/nttdata-logo.png" alt="NTTDATA" className="h-6 mx-auto mt-2" />
            </div>
            <Button 
              onClick={login} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Entrar com Cognito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;