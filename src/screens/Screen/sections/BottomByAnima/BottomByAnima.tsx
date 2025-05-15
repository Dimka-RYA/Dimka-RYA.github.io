import React, { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../../components/ui/select";
import { ChevronDownIcon, MapPin, Phone, Mail, Clock } from "lucide-react";

export const BottomByAnima = (): JSX.Element => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Service options data
  const serviceOptions = [
    { value: "service1", label: "Изготовление, сборка, монтаж металлоконструкций" },
    { value: "service2", label: "Сборка и монтаж котельных, инженерных систем" },
    { value: "service3", label: "Сборка и монтаж вентиляционных систем" },
    { value: "service4", label: "Остекление зданий" },
    { value: "service5", label: "Утепление зданий (сайдинг, профлист)" },
    { value: "service6", label: "Все виды сварочных работ" },
    { value: "service7", label: "Обустройство фасадов зданий" },
  ];

  // Contact information
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-[#87ceeb]" />,
      title: "+7 (831) 216-61-49",
      subtitle: "Телефон для связи"
    },
    {
      icon: <Mail className="w-6 h-6 text-[#87ceeb]" />,
      title: "info@ipmaslyakov.ru",
      subtitle: "Email для запросов"
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#87ceeb]" />,
      title: "г. Кстово, д. 5 А, оф.42",
      subtitle: "Нижегородская область"
    },
    {
      icon: <Clock className="w-6 h-6 text-[#87ceeb]" />,
      title: "Пн-Пт: 9:00 - 18:00",
      subtitle: "График работы"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <section className="w-full max-w-[1175px] mx-auto my-16">
      <h2 className="text-[40px] font-extrabold text-black text-center mb-[85px] font-['Nunito',Helvetica] tracking-[0]">
        КОНТАКТЫ
      </h2>
      
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
              <div className="bg-white p-3 rounded-full shadow-md">{item.icon}</div>
              <div>
                <h3 className="font-bold text-black text-lg font-['Nunito',Helvetica]">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Карта с формой поверх нее */}
      <div className="w-full h-[550px] rounded-lg overflow-hidden shadow-lg relative">
        <iframe 
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Aae2fd7f1fcf981d6acfe574a3ac7dff9029a7c4e3b2a080f13444de23bc20cae&amp;source=constructor&amp;ll=44.175180%2C56.149604&amp;z=16&amp;pt=44.175180%2C56.149604" 
          width="100%" 
          height="100%" 
          frameBorder="0"
          title="Карта расположения офиса"
          className="filter grayscale-[50%] opacity-95 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        ></iframe>
        
        {/* Форма поверх карты */}
        <Card className="absolute w-[380px] top-1/2 right-[5%] transform -translate-y-1/2 rounded-2xl shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="font-bold text-center text-black text-xl font-['Nunito',Helvetica] mb-6">
              Заполнить заявку
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Select defaultValue="service1">
                  <SelectTrigger className="w-full h-[45px] rounded-xl border-2 border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-50 transition-all duration-300">
                    <SelectValue placeholder="Какая-то услуга" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px] overflow-y-auto">
                    {serviceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Input 
                  className="h-[45px] rounded-xl border-2 border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-50 transition-all duration-300"
                  placeholder="Имя"
                />
              </div>
              
              <div className="space-y-2">
                <Input
                  className="h-[45px] rounded-xl border-2 border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-50 transition-all duration-300"
                  placeholder="+7 (777) 543-22-33"
                  type="tel"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full h-[50px] bg-[#87ceeb] hover:bg-[#65b6d8] rounded-xl transition-all duration-300 mt-4 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                disabled={formSubmitted}
              >
                <span className="font-bold text-white text-base font-['Nunito',Helvetica]">
                  {formSubmitted ? "Заявка отправлена!" : "Отправить заявку"}
                </span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};