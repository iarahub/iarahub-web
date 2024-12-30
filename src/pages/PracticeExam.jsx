import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { toast } from "sonner";

const PracticeExam = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  
  const exams = [
    {
      name: "AWS Cloud Practitioner",
      description: "Simulado para a certificação AWS Cloud Practitioner",
      questions: 65,
      duration: "90 minutos",
      level: "Iniciante",
      prompt: "Gere 5 questões de múltipla escolha sobre AWS Cloud Practitioner, focando em conceitos básicos de cloud computing, serviços fundamentais da AWS, segurança e preços. Formate as questões com: pergunta, 4 alternativas (a, b, c, d) e a resposta correta."
    },
    {
      name: "AWS Solutions Architect Associate",
      description: "Simulado para a certificação AWS Solutions Architect Associate",
      questions: 65,
      duration: "130 minutos",
      level: "Intermediário",
      prompt: "Gere 5 questões de múltipla escolha sobre AWS Solutions Architect Associate, focando em arquitetura de soluções, alta disponibilidade, disaster recovery e otimização de custos. Formate as questões com: pergunta, 4 alternativas (a, b, c, d) e a resposta correta."
    }
  ];

  const fetchQuestions = async (examPrompt) => {
    setIsLoading(true);
    try {
      console.log("Fetching questions with prompt:", examPrompt);
      const response = await fetch('https://bff-iarahub.vercel.app/api/groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: examPrompt
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao carregar as questões');
      }

      const data = await response.json();
      console.log("Received questions:", data);
      setQuestions(parseQuestions(data.message));
      setExamStarted(true);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error("Erro ao carregar as questões. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const parseQuestions = (rawText) => {
    // Simple parser for the API response
    const questionBlocks = rawText.split(/\d+\.\s+/).filter(Boolean);
    return questionBlocks.map(block => {
      const lines = block.split('\n').filter(Boolean);
      const question = lines[0].trim();
      const options = lines.slice(1, 5).map(line => line.trim());
      const correctAnswer = lines[5]?.replace(/Resposta correta:\s*/, '').trim() || 'a';
      
      return {
        question,
        options,
        correctAnswer
      };
    });
  };

  const handleStartExam = (exam) => {
    console.log("Starting exam:", exam.name);
    fetchQuestions(exam.prompt);
  };

  const handleAnswerSelect = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  if (!examStarted) {
    return (
      <div>
        <Navigation />
        <div className="container mx-auto p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Simulados de Certificação AWS</h1>
            <div className="grid gap-6">
              {exams.map((exam, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{exam.name}</CardTitle>
                    <CardDescription>{exam.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-500">Questões</p>
                        <p className="font-medium">{exam.questions}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Duração</p>
                        <p className="font-medium">{exam.duration}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Nível</p>
                        <p className="font-medium">{exam.level}</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleStartExam(exam)}
                      disabled={isLoading}
                    >
                      {isLoading ? "Carregando..." : "Iniciar Simulado"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Questão {currentQuestionIndex + 1} de {questions.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-lg font-medium">{currentQuestion?.question}</p>
                
                <RadioGroup
                  value={answers[currentQuestionIndex] || ""}
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {currentQuestion?.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={String.fromCharCode(97 + index)} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between mt-6">
                  <Button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    variant="outline"
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Próxima
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PracticeExam;