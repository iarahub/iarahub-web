import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

const ExamCalendar = ({ examDate }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Data da Prova</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={examDate}
          className="rounded-md border w-full"
        />
        {examDate && (
          <p className="mt-2 text-center">
            Sua prova está marcada para: {examDate.toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ExamCalendar;