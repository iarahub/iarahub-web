import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, LayoutDashboardIcon, BookOpenIcon, AwardIcon, BeakerIcon, UserIcon, FileTextIcon } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-12 w-auto" src="/logo.png" alt="Academia AWS NTTDATA Logo" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  <HomeIcon className="inline-block mr-1 h-4 w-4" />
                  Home
                </Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  <LayoutDashboardIcon className="inline-block mr-1 h-4 w-4" />
                  Dashboard
                </Link>
                <Link to="/knowledge-base" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  <BookOpenIcon className="inline-block mr-1 h-4 w-4" />
                  Base de Conhecimento
                </Link>
                <Link to="/certifications" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  <AwardIcon className="inline-block mr-1 h-4 w-4" />
                  Certificações
                </Link>
                <Link to="/labs" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  <BeakerIcon className="inline-block mr-1 h-4 w-4" />
                  Laboratórios
                </Link>
                <Link to="/tutors" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  <UserIcon className="inline-block mr-1 h-4 w-4" />
                  Tutores
                </Link>
                <Link to="/practice-exams" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  <FileTextIcon className="inline-block mr-1 h-4 w-4" />
                  Simulados
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
