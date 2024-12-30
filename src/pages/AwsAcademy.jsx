import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

const AwsAcademy = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AWS Academy</h1>
        <Card>
          <CardHeader>
            <CardTitle>Welcome to AWS Academy</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Here you can find resources and information about AWS Academy courses and certifications.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AwsAcademy;