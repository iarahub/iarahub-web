import { HomeIcon, LayoutDashboardIcon, BookOpenIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import KnowledgeBase from "./pages/KnowledgeBase.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <LayoutDashboardIcon className="h-4 w-4" />,
    page: <Dashboard />,
  },
  {
    title: "Base de Conhecimento",
    to: "/knowledge-base",
    icon: <BookOpenIcon className="h-4 w-4" />,
    page: <KnowledgeBase />,
  },
];
