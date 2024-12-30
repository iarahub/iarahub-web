import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AwsAcademy from "./pages/AwsAcademy";
import IaraTech from "./pages/IaraTech";
import IuclickTracker from "./pages/IuclickTracker";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

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

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <div className="min-h-screen bg-gray-100">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
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
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;