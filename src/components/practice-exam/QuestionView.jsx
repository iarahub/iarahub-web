import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const QuestionView = ({ 
  currentQuestion, 
  currentQuestionIndex, 
  totalQuestions, 
  selectedAnswer, 
  onAnswerSelect, 
  onPrevious, 
  onNext 
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Questão {currentQuestionIndex + 1} de {totalQuestions}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-lg font-medium">{currentQuestion?.question}</p>
            
            <RadioGroup
              value={selectedAnswer || ""}
              onValueChange={onAnswerSelect}
              className="space-y-3"
            >
              {currentQuestion?.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={String.fromCharCode(97 + index)} 
                    id={`option-${index}`} 
                  />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-6">
              <Button
                onClick={onPrevious}
                disabled={currentQuestionIndex === 0}
                variant="outline"
              >
                Anterior
              </Button>
              <Button
                onClick={onNext}
                disabled={currentQuestionIndex === totalQuestions - 1}
              >
                Próxima
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionView;