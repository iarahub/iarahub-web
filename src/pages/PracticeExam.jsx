import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import ExamList from '../components/practice-exam/ExamList';
import QuestionView from '../components/practice-exam/QuestionView';
import { toast } from "sonner";

const PracticeExam = () => {
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

  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-8">
        {!examStarted ? (
          <ExamList 
            exams={exams} 
            onStartExam={handleStartExam} 
            isLoading={isLoading} 
          />
        ) : (
          <QuestionView 
            currentQuestion={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            selectedAnswer={answers[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            onPrevious={handlePreviousQuestion}
            onNext={handleNextQuestion}
          />
        )}
      </div>
    </div>
  );
};

export default PracticeExam;