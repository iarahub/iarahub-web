import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CertifiedPeople from '../components/CertifiedPeople';
import { GraduationCap, UserIcon, ClockIcon, BrainIcon, Figma, BeakerIcon, Headphones, FileTextIcon, Users } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const sideButtons = [
    { name: 'AWS Academy', icon: <GraduationCap />, route: '/aws-academy' },
    { name: 'Onboarding', icon: <UserIcon />, route: '/onboarding' },
    { name: 'IUCLICK tracker', icon: <ClockIcon />, route: '/iuclick-tracker' },
    { name: 'IARA TECH', icon: <BrainIcon />, route: '/iara-tech' },
  ];

  const iaraHubOptions = [
    { name: 'Laboratórios', icon: <BeakerIcon />, route: '/labs' },
    { name: 'PodCast', icon: <Headphones />, route: '/podcast' },
    { name: 'Simulados', icon: <FileTextIcon />, route: '/practice-exams' },
    { name: 'Tutores', icon: <Users />, route: '/tutors' },
  ];

  const openIaraFigma = () => {
    window.open('https://app.uizard.io/p/5fdf42ee', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">Conheça nossos módulos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {sideButtons.map((button, index) => (
                    <Button
                      key={index}
                      onClick={() => navigate(button.route)}
                      className="w-full h-24 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      {React.cloneElement(button.icon, { className: "w-8 h-8 mb-2" })}
                      <span className="text-xs text-center">{button.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">IaraHub para você!</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {iaraHubOptions.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => navigate(option.route)}
                      className="w-full h-24 flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-lg"
                    >
                      {React.cloneElement(option.icon, { className: "w-8 h-8 mb-2" })}
                      <span className="text-xs text-center">{option.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-3/4 pl-0 md:pl-8">
            <h1 className="text-3xl font-bold mb-4">Bem-vindo à Academia AWS NTTDATA, {username}!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Cursos Disponíveis</CardTitle>
                  <CardDescription>Explore nossos cursos AWS</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5">
                    <li>AWS Cloud Practitioner</li>
                    <li>AWS Solutions Architect Associate</li>
                    <li>AWS Developer Associate</li>
                    <li>AWS SysOps Administrator Associate</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Progresso</CardTitle>
                  <CardDescription>Seu progresso nos cursos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Você ainda não iniciou nenhum curso.</p>
                </CardContent>
              </Card>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Pessoas Certificadas</h2>
              <CertifiedPeople />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button onClick={() => navigate('/certifications')} className="w-full">
                Certificações AWS
              </Button>
              <Button onClick={() => navigate('/tutors')} className="w-full">
                Tutores
              </Button>
              <Button onClick={() => navigate('/practice-exams')} className="w-full">
                Simulados
              </Button>
              <Button onClick={openIaraFigma} className="w-full bg-purple-600 hover:bg-purple-700">
                <Figma className="mr-2 h-4 w-4" />
                Ver Figma IARA
              </Button>
            </div>
          </div>
        </div>
        <Button onClick={handleLogout} className="mt-4">Sair</Button>
      </div>
    </div>
  );
};

export default Dashboard;