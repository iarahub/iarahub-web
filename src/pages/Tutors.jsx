import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Tutors = () => {
  const tutors = [
    {
      name: "Ana Silva",
      specialty: "AWS Solutions Architect",
      experience: "5 anos de experiência em AWS"
    },
    {
      name: "Carlos Oliveira",
      specialty: "AWS Developer",
      experience: "7 anos de experiência em desenvolvimento na AWS"
    },
    {
      name: "Mariana Santos",
      specialty: "AWS SysOps Administrator",
      experience: "6 anos de experiência em operações na AWS"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Tutores da Academia AWS NTTDATA</h1>
        {tutors.map((tutor, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle>{tutor.name}</CardTitle>
              <CardDescription>{tutor.specialty}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{tutor.experience}</p>
              <Button>Agendar Mentoria</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tutors;