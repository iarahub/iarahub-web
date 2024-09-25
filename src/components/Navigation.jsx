import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, ActivityIcon, LogOutIcon } from "lucide-react";

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
                <NavLink to="/onboarding" icon={<UserIcon />}>Onboarding NTTDATA</NavLink>
                <NavLink to="/iuclick-tracker" icon={<ActivityIcon />}>iuclick Tracker</NavLink>
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
