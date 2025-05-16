import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../../../../components/ui/carousel";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../../../lib/utils";

export const DivWrapperByAnima = (): JSX.Element => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  // Team members data for mapping
  const initialTeamMembers = [
    {
      id: 1,
      name: "Вадим Романов",
      age: 25,
      profession: "Психолог",
      description: "Топовый специалист в какойто сфере",
      image: "/image-2-3.png",
    },
    {
      id: 2,
      name: "Вадим Романов",
      age: 25,
      profession: "Программист",
      description: "Топовый специалист в какойто сфере",
      image: "/image-2-2.png",
    },
    {
      id: 3,
      name: "Дмитрий Рябов",
      age: 25,
      profession: "Python разработчик",
      description: "Топовый специалист в какойто сфере",
      image: "/image-8.png",
    },
    {
      id: 4,
      name: "Вадим Романов",
      age: 25,
      profession: "Full-Stack разработчик",
      description: "Топовый специалист в какойто сфере",
      image: "/image-2-4.png",
    },
  ];
  
  // Дублируем участников команды для бесконечной прокрутки
  const teamMembers = [...initialTeamMembers, ...initialTeamMembers, ...initialTeamMembers];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="w-full py-16 px-4">
      <h2 className="text-center font-extrabold text-black text-[40px] mb-16 [font-family:'Nunito',Helvetica] tracking-[0] leading-[normal]">
        НАША КОМАНДА
      </h2>

      <div className="relative max-w-[1252px] mx-auto">
        <Carousel 
          setApi={setApi} 
          className="w-full relative px-4 sm:px-6 md:px-8 lg:px-14"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {teamMembers.map((member, index) => (
              <CarouselItem
                key={`${member.id}-${index}`}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="h-[449px] bg-white rounded-[20px] border-[3px] border-solid border-[#87ceeb] overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="relative">
                      <img
                        className="w-full h-64 object-cover"
                        alt={`Photo of ${member.name}`}
                        src={member.image}
                      />
                    </div>

                    <div className="flex flex-col items-center justify-between flex-grow p-5">
                      <div className="text-center">
                        <h3 className="font-bold text-black text-xl [font-family:'Nunito',Helvetica] tracking-[0] leading-[normal] mb-1">
                          {member.name}
                        </h3>
                        <p className="[font-family:'Nunito',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[normal]">
                          {member.age} лет, {member.profession}
                        </p>
                      </div>

                      <p className="font-semibold text-black text-sm text-center [font-family:'Nunito',Helvetica] tracking-[0] leading-[normal] mt-4">
                        {member.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious 
            className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-1 md:-left-2 lg:-left-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none transition-all duration-300 hover:scale-110 z-10 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#87ceeb]" />
          </CarouselPrevious>
          
          <CarouselNext 
            className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-1 md:-right-2 lg:-right-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none transition-all duration-300 hover:scale-110 z-10 flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#87ceeb]" />
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
};
