import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";

const ExamList = ({ exams, onStartExam, isLoading }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Simulados de Certificação AWS NTTDATA</h1>
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
                onClick={() => onStartExam(exam)}
                disabled={isLoading}
              >
                {isLoading ? "Carregando..." : "Iniciar Simulado"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExamList;