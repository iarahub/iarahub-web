import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { GraduationCap, UserIcon, ClockIcon, BrainIcon, BeakerIcon, Users } from 'lucide-react';
import { ExamCalendar } from '../components/ExamCalendar';
import CertifiedPeople from '../components/CertifiedPeople';
import { useNavigate } from 'react-router-dom';
import PodcastSection from '../components/dashboard/PodcastSection';
import PracticeExamSection from '../components/dashboard/PracticeExamSection';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const examDate = new Date('2024-06-14');
  const progress = 66;
  const passingProbability = 78;

  const mainModules = [
    { name: 'AWS Academy', icon: <GraduationCap className="h-8 w-8" />, route: '/aws-academy' },
    { name: 'Onboarding', icon: <UserIcon className="h-8 w-8" />, route: '/onboarding' },
    { name: 'IUCLICK tracker', icon: <ClockIcon className="h-8 w-8" />, route: '/iuclick-tracker' },
    { name: 'IARA TECH', icon: <BrainIcon className="h-8 w-8" />, route: '/iara-tech' },
  ];

  const additionalModules = [
    { name: 'Laboratórios', icon: <BeakerIcon className="h-8 w-8" />, route: '/labs' },
    { name: 'Tutores', icon: <Users className="h-8 w-8" />, route: '/tutors' },
  ];

  const courses = [
    "AWS Cloud Practitioner",
    "AWS Solutions Architect Associate",
    "AWS Developer Associate",
    "AWS SysOps Administrator Associate"
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">
          Bem-vindo à Academia AWS NTTDATA, {user?.name || 'Digital Lover'}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="md:col-span-4 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Conheça nossos módulos</h2>
                <div className="grid grid-cols-2 gap-4">
                  {mainModules.map((module, index) => (
                    <button
                      key={index}
                      onClick={() => navigate(module.route)}
                      className="p-4 bg-primary text-white rounded-lg flex flex-col items-center justify-center space-y-2 hover:bg-primary-dark transition-colors"
                    >
                      {module.icon}
                      <span className="text-sm text-center">{module.name}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">IaraHub para você!</h2>
                <div className="grid grid-cols-2 gap-4">
                  {additionalModules.map((module, index) => (
                    <button
                      key={index}
                      onClick={() => navigate(module.route)}
                      className="p-4 bg-green-500 text-white rounded-lg flex flex-col items-center justify-center space-y-2 hover:bg-green-600 transition-colors"
                    >
                      {module.icon}
                      <span className="text-sm text-center">{module.name}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column */}
          <div className="md:col-span-5 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">Cursos Disponíveis</h2>
                <p className="text-sm text-gray-500 mb-4">Explore nossos cursos AWS</p>
                <ul className="space-y-2">
                  {courses.map((course, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span>{course}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">Progresso</h2>
                <p className="text-sm text-gray-500 mb-4">Seu progresso nos cursos</p>
                <Progress value={progress} className="h-2 mb-2" />
                <p className="text-sm text-gray-600">{progress}% concluído</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">Possibilidade de passar na Prova</h2>
                <p className="text-sm text-gray-500 mb-4">Avaliação da IARAHUB</p>
                <Progress value={passingProbability} className="h-2 mb-2" />
                <p className="text-sm text-gray-600">{passingProbability}%</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Digital Lover's Certificados</h2>
                <CertifiedPeople />
              </CardContent>
            </Card>

            <PodcastSection />
            <PracticeExamSection />
          </div>

          {/* Right Column */}
          <div className="md:col-span-3">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Data da Prova</h2>
                <ExamCalendar examDate={examDate} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;