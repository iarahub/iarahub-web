import React from "react";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AwsAcademy from "./pages/AwsAcademy";
import IaraTech from "./pages/IaraTech";
import IuclickTracker from "./pages/IuclickTracker";
import Onboarding from "./pages/Onboarding";
import Podcast from "./pages/Podcast";
import PracticeExam from "./pages/PracticeExam";
import KnowledgeBase from "./pages/KnowledgeBase";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <div className="min-h-screen bg-gray-100">
                {user && <Navigation onLogout={() => {/* handle logout */}} />}
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/knowledge-base" element={
                    <ProtectedRoute>
                      <KnowledgeBase />
                    </ProtectedRoute>
                  } />
                  <Route path="/aws-academy" element={
                    <ProtectedRoute>
                      <AwsAcademy />
                    </ProtectedRoute>
                  } />
                  <Route path="/iara-tech" element={
                    <ProtectedRoute>
                      <IaraTech />
                    </ProtectedRoute>
                  } />
                  <Route path="/iuclick-tracker" element={
                    <ProtectedRoute>
                      <IuclickTracker />
                    </ProtectedRoute>
                  } />
                  <Route path="/onboarding" element={
                    <ProtectedRoute>
                      <Onboarding />
                    </ProtectedRoute>
                  } />
                  <Route path="/podcast" element={
                    <ProtectedRoute>
                      <Podcast />
                    </ProtectedRoute>
                  } />
                  <Route path="/practice-exam" element={
                    <ProtectedRoute>
                      <PracticeExam />
                    </ProtectedRoute>
                  } />
                  <Route path="/practice-exam/:examId" element={
                    <ProtectedRoute>
                      <PracticeExam />
                    </ProtectedRoute>
                  } />
                </Routes>
              </div>
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;