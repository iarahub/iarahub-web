import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const LearningProgress = () => {
  const courses = [
    { name: "AWS Cloud Practitioner", progress: 75 },
    { name: "AWS Solutions Architect Associate", progress: 40 },
    { name: "AWS Developer Associate", progress: 10 },
    { name: "AWS SysOps Administrator Associate", progress: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Seu Progresso de Aprendizado</h1>
        {courses.map((course, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={course.progress} className="w-full" />
              <p className="mt-2 text-sm text-gray-600">{course.progress}% concluído</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningProgress;