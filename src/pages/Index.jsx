import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    } else {
      // Check if we're on the login page directly
      const isDirectAccess = !document.referrer.includes('iarahub.auth.us-east-1.amazoncognito.com');
      if (isDirectAccess) {
        // Redirect to login through Cognito
        login();
      }
    }
  }, [user, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Redirecionando para login...</h1>
      </div>
    </div>
  );
};

export default Index;