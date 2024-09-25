import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Labs = () => {
  const labs = [
    {
      name: "Criando uma instância EC2",
      description: "Aprenda a lançar e configurar uma máquina virtual na AWS",
      difficulty: "Iniciante"
    },
    {
      name: "Configurando um bucket S3",
      description: "Crie e gerencie armazenamento de objetos na nuvem",
      difficulty: "Iniciante"
    },
    {
      name: "Implantando uma aplicação com Elastic Beanstalk",
      description: "Automatize o deploy de aplicações web",
      difficulty: "Intermediário"
    },
    {
      name: "Criando uma VPC personalizada",
      description: "Configure uma rede virtual isolada na nuvem AWS",
      difficulty: "Avançado"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Laboratórios Práticos AWS</h1>
        {labs.map((lab, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle>{lab.name}</CardTitle>
              <CardDescription>{lab.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Dificuldade: <span className="font-semibold">{lab.difficulty}</span></p>
              <Button>Iniciar Laboratório</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Labs;