import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";

const Register = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      enterprise: "NTTDATA",
      language: "PTBR"
    }
  });

  const onSubmit = async (data) => {
    try {
      console.log("Submitting registration data:", data);
      const response = await fetch("https://bff-iarahub.vercel.app/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Falha no registro");
      }

      toast.success("Registro realizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Erro ao registrar. Por favor, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="iaraHub.IA" className="h-12 mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-gray-900">Registro</h1>
          <p className="text-gray-600">Crie sua conta na iaraHub.IA</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu.email@nttdata.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Função</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione sua função" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Administrador">Administrador</SelectItem>
                      <SelectItem value="Usuario">Usuário</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Registrar
            </Button>

            <div className="text-center mt-4">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate("/")}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Já tem uma conta? Faça login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;