import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BrainIcon, ClockIcon, UserIcon } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const modules = [
    { name: 'AWS Academy', icon: <GraduationCap />, route: '/aws-academy' },
    { name: 'IARA TECH', icon: <BrainIcon />, route: '/iara-tech' },
    { name: 'IUCLICK tracker', icon: <ClockIcon />, route: '/iuclick-tracker' },
    { name: 'Onboarding', icon: <UserIcon />, route: '/onboarding' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">IARA Módulos</h1>
        <div className="grid grid-cols-2 gap-4">
          {modules.map((module, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Button
                  onClick={() => navigate(module.route)}
                  className="w-full h-32 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {React.cloneElement(module.icon, { className: "w-12 h-12 mb-2" })}
                  <span className="text-lg font-semibold">{module.name}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;