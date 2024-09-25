import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const KnowledgeBase = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Base de Conhecimento StackSpo IA</h1>
          <Button onClick={() => navigate('/dashboard')}>Voltar ao Dashboard</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recursos de Aprendizagem</CardTitle>
            <CardDescription>Explore nossa base de conhecimento sobre AWS</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Guias de Início Rápido</li>
              <li>Tutoriais em Vídeo</li>
              <li>Documentação Técnica</li>
              <li>Melhores Práticas</li>
              <li>Estudos de Caso</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KnowledgeBase;