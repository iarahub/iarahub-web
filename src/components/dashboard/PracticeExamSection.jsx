import React from 'react';
import { Card, CardContent } from "../ui/card";
import { FileText } from 'lucide-react';
import { Button } from "../ui/button";
import { useNavigate } from 'react-router-dom';

const PracticeExamSection = () => {
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
    }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FileText className="mr-2 h-6 w-6 text-primary" />
          Simulados AWS
        </h2>
        <div className="space-y-4">
          {exams.map((exam, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">{exam.name}</h3>
                <p className="text-sm text-gray-500">{exam.description}</p>
                <div className="grid grid-cols-3 gap-2 text-sm">
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
                  className="w-full mt-2"
                  onClick={() => navigate(`/practice-exam/${exam.name.toLowerCase().replace(/\s+/g, '-')}`)}
                >
                  Iniciar Simulado
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticeExamSection;