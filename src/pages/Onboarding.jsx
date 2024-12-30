import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

const Onboarding = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Onboarding NTTDATA</h1>
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo à NTTDATA</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Aqui você encontrará todas as informações necessárias para iniciar sua jornada na NTTDATA.</p>
            <ul className="list-disc pl-5 mt-4">
              <li>Cultura e valores da empresa</li>
              <li>Políticas e procedimentos</li>
              <li>Treinamentos iniciais</li>
              <li>Contatos importantes</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;