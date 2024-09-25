import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import KnowledgeBase from "./pages/KnowledgeBase";
import Certifications from "./pages/Certifications";
import Labs from "./pages/Labs";
import Tutors from "./pages/Tutors";
import PracticeExams from "./pages/PracticeExams";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          {isLoggedIn && <Navigation onLogout={handleLogout} />}
          <Routes>
            <Route path="/" element={<Index onLogin={handleLogin} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/tutors" element={<Tutors />} />
            <Route path="/practice-exams" element={<PracticeExams />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
