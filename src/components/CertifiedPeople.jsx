import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const certifiedPeople = [
  { name: "Marcio", comment: "A certificação AWS mudou minha carreira!", image: "/placeholder.svg" },
  { name: "Bruna", comment: "Excelente programa de certificação!", image: "/placeholder.svg" },
  { name: "Celina", comment: "Recomendo a todos os profissionais de TI!", image: "/placeholder.svg" },
  { name: "Daniela Inez", comment: "Ótima experiência de aprendizado!", image: "/placeholder.svg" },
  { name: "Wesley Nova Lima", comment: "Certificação AWS é essencial!", image: "/placeholder.svg" },
  { name: "Jackson", comment: "Melhorou muito minhas habilidades em nuvem!", image: "/placeholder.svg" },
];

const CertifiedPeople = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {certifiedPeople.map((person, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4 flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={person.image} alt={person.name} className="object-cover" />
              <AvatarFallback>{person.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{person.name}</h3>
              <p className="text-sm text-gray-600">{person.comment}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CertifiedPeople;