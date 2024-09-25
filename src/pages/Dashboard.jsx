import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Bem-vindo à Academia AWS NTTDATA, {username}!</h1>
          <Button onClick={handleLogout}>Sair</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={() => navigate('/certifications')} className="w-full">
            Certificações AWS
          </Button>
          <Button onClick={() => navigate('/tutors')} className="w-full">
            Tutores
          </Button>
          <Button onClick={() => navigate('/practice-exams')} className="w-full">
            Simulados
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
