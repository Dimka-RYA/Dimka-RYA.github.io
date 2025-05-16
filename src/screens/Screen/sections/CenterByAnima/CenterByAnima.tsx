import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

// Добавляем маппинг идентификаторов услуг
const serviceSlugMap: Record<number, string> = {
  1: "metal-construction",
  2: "boiler-installation",
  3: "ventilation",
  4: "glazing",
  5: "insulation",
  6: "welding",
  7: "facade"
};

export const CenterByAnima = (): JSX.Element => {
  // State to track hovered card
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Service data for mapping
  const services = [
    {
      id: 1,
      title: "Изготовление, сборка, монтаж металлоконструкций",
      image: "/image-7.png",
      position: "left",
    },
    {
      id: 2,
      title: "Сборка и монтаж котельных, инженерных систем, газоходов под ключ",
      image: "/image.png",
      position: "right",
    },
    {
      id: 3,
      title: "Сборка и монтаж вентиляционных систем",
      image: "/image-2.png",
      position: "left",
    },
    {
      id: 4,
      title: "Остекление зданий",
      image: "/image-3.png",
      position: "right",
    },
    {
      id: 5,
      title: "Утепление зданий (сайдинг, профлист)",
      image: "/image-4.png",
      position: "left",
    },
    {
      id: 6,
      title: "Все виды сварочных работ",
      image: "/image-5.png",
      position: "right",
    },
    {
      id: 7,
      title: "Обустройство фасадов зданий",
      image: "/image-6.png",
      position: "left",
    },
  ];

  return (
    <section className="w-full max-w-[1172px] mx-auto py-16 px-4">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 font-['Nunito',Helvetica] tracking-tight">
          НАШИ УСЛУГИ
        </h2>
        <div className="mt-3 h-1 w-20 bg-[#87ceeb] mx-auto rounded-full"></div>
      </div>

      <div className="flex flex-col gap-[50px]">
        {services.map((service) => (
          <div
            key={service.id}
            className={`flex ${service.position === "right" ? "justify-end" : "justify-start"}`}
          >
            <Card 
              className={`w-[870px] h-[225px] relative overflow-hidden rounded-[20px] transition-all duration-300
                ${hoveredCard === service.id ? "border-[3px] border-solid border-[#87ceeb] shadow-lg" : "border-none"}`}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              <div 
                className={`absolute inset-0 bg-[#00000099] z-10 transition-opacity duration-300 ease-in-out
                  ${hoveredCard === service.id ? "opacity-100" : "opacity-0"}`} 
              />
              <CardContent className={`relative z-20 h-full p-0 ${hoveredCard === service.id ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className="p-[25px] flex flex-col justify-between h-full">
                  <h3 
                    className={`w-full font-black text-white text-xl sm:text-2xl font-['Nunito',Helvetica] tracking-[0] leading-normal
                      transition-all duration-300 ease-in-out ${hoveredCard === service.id ? "opacity-100 transform-none" : "opacity-0 -translate-y-4"}`}
                  >
                    {service.title}
                  </h3>
                  <div className="w-full sm:w-[375px]">
                    <Link to={`/services/${serviceSlugMap[service.id]}`}>
                      <Button 
                        className={`w-full h-[50px] sm:h-[61px] bg-[#5aabcc] rounded-[15px] font-bold text-white text-xl sm:text-2xl font-['Nunito',Helvetica]
                          transition-all duration-300 ease-in-out ${hoveredCard === service.id ? "opacity-100 transform-none" : "opacity-0 translate-y-4"}`}
                      >
                        Подробнее
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
