import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const PracticeExam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const { data: questions, isLoading, error } = useQuery({
    queryKey: ['practice-exam'],
    queryFn: async () => {
      const prompt = `Generate 5 multiple choice questions for AWS Cloud Practitioner certification. 
                     Each question should have 4 options (A, B, C, D) and include the correct answer. 
                     Format as JSON array with fields: question, options (array), correctAnswer (index 0-3)`;
      
      const response = await fetch('https://bff-iarahub.vercel.app/api/groq', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'prompt': prompt
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      return JSON.parse(data.response);
    }
  });

  const handleAnswerSelect = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: parseInt(value)
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = async () => {
    const totalQuestions = questions.length;
    const correctAnswers = questions.reduce((acc, question, index) => {
      return acc + (question.correctAnswer === answers[index] ? 1 : 0);
    }, 0);
    const percentage = (correctAnswers / totalQuestions) * 100;

    // Get AI feedback based on performance
    const feedbackPrompt = `The user got ${correctAnswers} correct answers out of ${totalQuestions} questions (${percentage.toFixed(1)}%) 
                          on the AWS Cloud Practitioner practice exam. Provide a brief, encouraging feedback message about their performance 
                          and suggest what to focus on next.`;

    try {
      const response = await fetch('https://bff-iarahub.vercel.app/api/groq', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'prompt': feedbackPrompt
        }
      });

      const data = await response.json();
      const feedback = data.response;

      toast({
        title: "Exam Results",
        description: `Score: ${percentage.toFixed(1)}%\n${feedback}`,
        duration: 10000,
      });
    } catch (error) {
      console.error('Error getting feedback:', error);
    }

    setShowResults(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <p className="text-red-500">Error loading questions. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!questions) return null;

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            Practice Exam - Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <p className="text-lg font-medium">{currentQuestionData.question}</p>
            
            <RadioGroup
              value={answers[currentQuestion]?.toString()}
              onValueChange={handleAnswerSelect}
              className="space-y-4"
            >
              {currentQuestionData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    disabled={showResults}
                  />
                  <Label htmlFor={`option-${index}`} className="text-base">
                    {option}
                  </Label>
                  {showResults && index === currentQuestionData.correctAnswer && (
                    <span className="text-green-500 ml-2">(Correct Answer)</span>
                  )}
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-6">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={calculateResults}
                  disabled={showResults || Object.keys(answers).length !== questions.length}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={answers[currentQuestion] === undefined}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeExam;