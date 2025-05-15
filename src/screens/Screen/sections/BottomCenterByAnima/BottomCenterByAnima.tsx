import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { 
  Shield, 
  Clock, 
  BadgeCheck, 
  UserCheck, 
  TrendingUp, 
  Banknote 
} from "lucide-react";

export const BottomCenterByAnima = (): JSX.Element => {
  // Data for the advantage cards
  const advantages = [
    {
      id: 1,
      title: "ГАРАНТИЯ",
      description: "Предоставляем гарантию до 5 лет на все виды работ и используемые материалы",
      icon: <Shield className="w-16 h-16 text-[#87ceeb] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ease-in-out" />,
    },
    {
      id: 2,
      title: "СКОРОСТЬ",
      description: "Выполняем работу точно в срок, не задерживая сдачу проектов",
      icon: <Clock className="w-16 h-16 text-[#87ceeb] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ease-in-out" />,
    },
    {
      id: 3,
      title: "КАЧЕСТВО",
      description: "Используем только сертифицированные материалы и современное оборудование",
      icon: <BadgeCheck className="w-16 h-16 text-[#87ceeb] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ease-in-out" />,
    },
    {
      id: 4,
      title: "ОПЫТ",
      description: "Наши специалисты имеют более 10 лет опыта работы в строительной сфере",
      icon: <UserCheck className="w-16 h-16 text-[#87ceeb] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ease-in-out" />,
    },
    {
      id: 5,
      title: "ЭФФЕКТИВНОСТЬ",
      description: "Постоянно совершенствуем технологии и методы работы для лучшего результата",
      icon: <TrendingUp className="w-16 h-16 text-[#87ceeb] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ease-in-out" />,
    },
    {
      id: 6,
      title: "ДОСТУПНЫЕ ЦЕНЫ",
      description: "Предлагаем честные и конкурентные цены без скрытых доплат",
      icon: <Banknote className="w-16 h-16 text-[#87ceeb] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ease-in-out" />,
    },
  ];

  return (
    <section className="w-full max-w-[1100px] mx-auto py-16">
      <h2 className="text-[40px] font-extrabold text-black text-center [font-family:'Nunito',Helvetica] mb-16">
        НАШИ ПРЕИМУЩЕСТВА
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
        {advantages.map((advantage) => (
          <Card 
            key={advantage.id} 
            className="group border-none shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#87ceeb] hover:border-2"
          >
            <CardContent className="p-6 text-center">
              {advantage.icon}
              <h3 className="font-bold text-[28px] text-black [font-family:'Nunito',Helvetica] mb-4 text-center group-hover:text-[#87ceeb] transition-colors duration-300 ease-in-out">
                {advantage.title}
              </h3>
              <p className="font-normal text-lg text-gray-700 [font-family:'Nunito',Helvetica]">
                {advantage.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
