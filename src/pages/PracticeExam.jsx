import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const PracticeExam = () => {
  const navigate = useNavigate();
  
  const exams = [
    {
      name: "AWS Cloud Practitioner",
      description: "Simulado para a certificação AWS Cloud Practitioner",
      questions: 65,
      duration: "90 minutos",
      level: "Iniciante"
    },
    {
      name: "AWS Solutions Architect Associate",
      description: "Simulado para a certificação AWS Solutions Architect Associate",
      questions: 65,
      duration: "130 minutos",
      level: "Intermediário"
    },
    {
      name: "AWS Developer Associate",
      description: "Simulado para a certificação AWS Developer Associate",
      questions: 65,
      duration: "130 minutos",
      level: "Intermediário"
    }
  ];

  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Simulados de Certificação AWS</h1>
          <div className="grid gap-6">
            {exams.map((exam, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{exam.name}</CardTitle>
                  <CardDescription>{exam.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500">Questões</p>
                      <p className="font-medium">{exam.questions}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Duração</p>
                      <p className="font-medium">{exam.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Nível</p>
                      <p className="font-medium">{exam.level}</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/practice-exam/${exam.name.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    Iniciar Simulado
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeExam;