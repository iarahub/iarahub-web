import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const IaraTech = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">IARA TECH</h1>
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo ao IARA TECH</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Aqui você encontrará recursos e informações sobre nossa tecnologia de inteligência artificial.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IaraTech;