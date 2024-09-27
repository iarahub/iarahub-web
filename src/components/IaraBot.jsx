import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle } from 'lucide-react';

const IaraBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Olá! Bem-vindo à Academia AWS NTTDATA. Como posso ajudar você hoje?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    
    const userMessage = { text: input, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    
    // Simulated bot response
    setTimeout(() => {
      const botMessage = { text: "Obrigado por sua mensagem. Um tutor entrará em contato em breve.", sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button onClick={handleToggle} className="rounded-full w-12 h-12 flex items-center justify-center">
          <MessageCircle />
        </Button>
      )}
      {isOpen && (
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              IaraBot
              <Button onClick={handleToggle} variant="ghost" className="h-8 w-8 p-0">
                &times;
              </Button>
            </CardTitle>
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
                placeholder="Digite sua mensagem..."
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={handleSend}>Enviar</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IaraBot;