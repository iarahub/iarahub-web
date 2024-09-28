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
  const { user, logout } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-100">
            {user && <Navigation onLogout={logout} />}
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Index />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/knowledge-base" element={<ProtectedRoute><KnowledgeBase /></ProtectedRoute>} />
                <Route path="/certifications" element={<ProtectedRoute><Certifications /></ProtectedRoute>} />
                <Route path="/labs" element={<ProtectedRoute><Labs /></ProtectedRoute>} />
                <Route path="/tutors" element={<ProtectedRoute><Tutors /></ProtectedRoute>} />
                <Route path="/practice-exams" element={<ProtectedRoute><PracticeExams /></ProtectedRoute>} />
                <Route path="/aws-academy" element={<ProtectedRoute><AwsAcademy /></ProtectedRoute>} />
                <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
                <Route path="/iuclick-tracker" element={<ProtectedRoute><IuclickTracker /></ProtectedRoute>} />
                <Route path="/iara-tech" element={<ProtectedRoute><IaraTech /></ProtectedRoute>} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const AppWithAuth = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuth;