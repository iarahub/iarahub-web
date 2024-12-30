import React from 'react';
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const ExamCalendar = ({ examDate }) => {
  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={examDate}
        locale={ptBR}
        className="rounded-md border"
        disabled={(date) => date < new Date()}
      />
      {examDate && (
        <p className="text-center text-sm text-gray-600">
          Sua prova está marcada para: {format(examDate, "dd/MM/yyyy")}
        </p>
      )}
    </div>
  );
};