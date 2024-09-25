import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const IuclickTracker = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">iuclick Tracker</h1>
        <Card>
          <CardHeader>
            <CardTitle>Acompanhe suas atividades</CardTitle>
          </CardHeader>
          <CardContent>
            <p>O iuclick Tracker permite que você monitore e gerencie suas atividades de forma eficiente.</p>
            <ul className="list-disc pl-5 mt-4">
              <li>Visualize suas tarefas atuais</li>
              <li>Acompanhe o tempo gasto em cada projeto</li>
              <li>Gere relatórios de produtividade</li>
              <li>Integre com outras ferramentas da NTTDATA</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IuclickTracker;