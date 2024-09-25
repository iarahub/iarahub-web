import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Certifications = () => {
  const certifications = [
    {
      name: "AWS Certified Cloud Practitioner",
      description: "Fundamentos da AWS e conceitos de nuvem",
      status: "Em andamento"
    },
    {
      name: "AWS Certified Solutions Architect - Associate",
      description: "Projetar sistemas distribuídos na AWS",
      status: "Não iniciado"
    },
    {
      name: "AWS Certified Developer - Associate",
      description: "Desenvolver e manter aplicações na AWS",
      status: "Não iniciado"
    },
    {
      name: "AWS Certified SysOps Administrator - Associate",
      description: "Operações de sistemas e redes na AWS",
      status: "Não iniciado"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Certificações AWS</h1>
        {certifications.map((cert, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle>{cert.name}</CardTitle>
              <CardDescription>{cert.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Status: <span className="font-semibold">{cert.status}</span></p>
              <Button>Iniciar Preparação</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Certifications;