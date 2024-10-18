import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import KnowledgeBase from "./pages/KnowledgeBase";
import Certifications from "./pages/Certifications";
import Labs from "./pages/Labs";
import Tutors from "./pages/Tutors";
import PracticeExams from "./pages/PracticeExams";
import AwsAcademy from "./pages/AwsAcademy";
import Onboarding from "./pages/Onboarding";
import IuclickTracker from "./pages/IuclickTracker";
import IaraTech from "./pages/IaraTech";

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
                    <Navigation />
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/knowledge-base" element={
                  <ProtectedRoute>
                    <Navigation />
                    <KnowledgeBase />
                  </ProtectedRoute>
                } />
                <Route path="/certifications" element={
                  <ProtectedRoute>
                    <Navigation />
                    <Certifications />
                  </ProtectedRoute>
                } />
                <Route path="/labs" element={
                  <ProtectedRoute>
                    <Navigation />
                    <Labs />
                  </ProtectedRoute>
                } />
                <Route path="/tutors" element={
                  <ProtectedRoute>
                    <Navigation />
                    <Tutors />
                  </ProtectedRoute>
                } />
                <Route path="/practice-exams" element={
                  <ProtectedRoute>
                    <Navigation />
                    <PracticeExams />
                  </ProtectedRoute>
                } />
                <Route path="/aws-academy" element={
                  <ProtectedRoute>
                    <Navigation />
                    <AwsAcademy />
                  </ProtectedRoute>
                } />
                <Route path="/onboarding" element={
                  <ProtectedRoute>
                    <Navigation />
                    <Onboarding />
                  </ProtectedRoute>
                } />
                <Route path="/iuclick-tracker" element={
                  <ProtectedRoute>
                    <Navigation />
                    <IuclickTracker />
                  </ProtectedRoute>
                } />
                <Route path="/iara-tech" element={
                  <ProtectedRoute>
                    <Navigation />
                    <IaraTech />
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