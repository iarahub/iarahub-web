import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const IaraBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const aiResponses = {
    "O que é StackSpot?": "StackSpot é uma plataforma de desenvolvimento que ajuda as empresas a acelerar sua jornada de transformação digital, fornecendo templates, stacks e componentes pré-configurados.",
    "Como a IA é usada no StackSpot?": "O StackSpot utiliza IA para otimizar a seleção de componentes, automatizar tarefas de desenvolvimento e fornecer recomendações personalizadas para os desenvolvedores.",
    "Quais são os benefícios de usar IA com StackSpot?": "Os benefícios incluem desenvolvimento mais rápido, redução de erros, melhor qualidade de código e capacidade de focar em tarefas de maior valor agregado.",
    "default": "Desculpe, não tenho informações específicas sobre isso. Posso ajudar com perguntas sobre StackSpot e IA em geral."
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    const botResponse = { text: aiResponses[input] || aiResponses.default, sender: 'bot' };

    setMessages([...messages, userMessage, botResponse]);
    setInput('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>IaraBot - StackSpot IA</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                {message.text}
              </span>
            </div>
          ))}
        </ScrollArea>
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua pergunta..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend}>Enviar</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IaraBot;
