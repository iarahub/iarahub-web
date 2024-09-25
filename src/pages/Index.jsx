import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const Index = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      localStorage.setItem('username', username);
      onLogin();
      navigate('/dashboard');
    } else {
      toast.error("Por favor, insira um nome de usuário.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-primary text-2xl">iaraHub IA</CardTitle>
          <CardDescription>Faça login para acessar o dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Nome de Usuário</Label>
                <Input id="username" placeholder="Digite seu nome" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button onClick={handleLogin} className="w-full bg-primary hover:bg-secondary text-white mb-4">Entrar</Button>
          <div className="text-sm text-gray-600">
            <p className="font-semibold mb-2">Conheça nossos módulos:</p>
            <ul className="list-disc pl-5">
              <li>Onboarding NTTDATA</li>
              <li>iuclick Tracker</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
