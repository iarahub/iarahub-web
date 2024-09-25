import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PracticeExams = () => {
  const exams = [
    {
      name: "AWS Cloud Practitioner",
      description: "Simulado para a certificação AWS Cloud Practitioner",
      questions: 65,
      duration: "90 minutos"
    },
    {
      name: "AWS Solutions Architect Associate",
      description: "Simulado para a certificação AWS Solutions Architect Associate",
      questions: 65,
      duration: "130 minutos"
    },
    {
      name: "AWS Developer Associate",
      description: "Simulado para a certificação AWS Developer Associate",
      questions: 65,
      duration: "130 minutos"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Simulados de Certificação AWS NTTDATA</h1>
        {exams.map((exam, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle>{exam.name}</CardTitle>
              <CardDescription>{exam.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Questões: {exam.questions}</p>
              <p className="mb-2">Duração: {exam.duration}</p>
              <Button>Iniciar Simulado</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PracticeExams;