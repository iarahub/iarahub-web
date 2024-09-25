import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, AwardIcon, BeakerIcon, UserIcon, FileTextIcon, LogOutIcon } from "lucide-react";

const Navigation = ({ onLogout }) => {
  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-xl font-bold">
              iaraHub IA
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/dashboard" icon={<HomeIcon />}>Home</NavLink>
                <NavLink to="/knowledge-base" icon={<BookOpenIcon />}>Base de Conhecimento</NavLink>
                <NavLink to="/certifications" icon={<AwardIcon />}>Certificações</NavLink>
                <NavLink to="/labs" icon={<BeakerIcon />}>Laboratórios</NavLink>
                <NavLink to="/tutors" icon={<UserIcon />}>Tutores</NavLink>
                <NavLink to="/practice-exams" icon={<FileTextIcon />}>Simulados</NavLink>
              </div>
            </div>
          </div>
          <button onClick={onLogout} className="flex items-center text-white hover:text-secondary">
            <LogOutIcon className="mr-2 h-4 w-4" />
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, children }) => (
  <Link to={to} className="text-white hover:text-secondary px-3 py-2 rounded-md text-sm font-medium flex items-center">
    {React.cloneElement(icon, { className: "mr-1 h-4 w-4" })}
    {children}
  </Link>
);

export default Navigation;
