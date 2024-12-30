import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const certifiedPeople = [
  { 
    name: "Marcio", 
    comment: "A certificação AWS mudou minha carreira!", 
    image: "/placeholder.svg" 
  },
  { 
    name: "Bruna", 
    comment: "Excelente programa de certificação!", 
    image: "/placeholder.svg" 
  },
  { 
    name: "Celina", 
    comment: "Recomendo a todos os profissionais de TI!", 
    image: "/placeholder.svg" 
  }
];

const CertifiedPeople = () => {
  return (
    <div className="space-y-4">
      {certifiedPeople.map((person, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={person.image} alt={person.name} />
            <AvatarFallback>{person.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{person.name}</h3>
            <p className="text-sm text-gray-600">{person.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertifiedPeople;