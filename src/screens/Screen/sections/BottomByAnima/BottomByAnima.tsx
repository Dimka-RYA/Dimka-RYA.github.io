import React, { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../../components/ui/select";
import { ChevronDownIcon, MapPin, Phone, Mail, Clock } from "lucide-react";
import { saveFormSubmission } from "../../../../lib/supabase";

// Формспри - замените на ваш формспри ID после регистрации
const FORMSPREE_FORM_ID = "xpwdbdkj"; // Пример ID, нужно заменить на свой

export const BottomByAnima = (): JSX.Element => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    service: "service1",
    name: "",
    email: ""
  });
  
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
  
  // Обработчик изменения полей формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Обработчик изменения выбранной услуги
  const handleServiceChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка заполненности обязательных полей
    if (!formData.name || !formData.email) {
      alert('Пожалуйста, заполните все поля формы');
      return;
    }
    
    try {
      setFormSubmitted(true);
      
      // Находим название услуги по выбранному значению
      const selectedService = serviceOptions.find(opt => opt.value === formData.service);
      
      console.log('Начинаем отправку формы в Supabase');
      
      // Отправка данных в Supabase
      const result = await saveFormSubmission({
        name: formData.name,
        phone: "", // Добавляем пустое поле телефона, так как оно обязательное в схеме
        email: formData.email,
        message: 'Заявка с карты на главной странице',
        type: 'quick', // Тип формы - быстрая заявка
        service: selectedService?.label || 'Не указана'
      });
      
      console.log('Результат отправки:', result);
      
      if (!result.success) {
        console.error('Ошибка при отправке формы:', result.error);
        throw new Error(result.message || 'Ошибка при отправке формы');
      }
      
      // Сброс формы через 5 секунд
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          service: "service1",
          name: "",
          email: ""
        });
      }, 5000);
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
      setFormSubmitted(false);
    }
  };

  return (
    <section className="w-full max-w-[1175px] mx-auto my-16 px-4 sm:px-0">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 font-['Nunito',Helvetica] tracking-tight">
          КОНТАКТЫ
        </h2>
        <div className="mt-3 h-1 w-20 bg-[#87ceeb] mx-auto rounded-full"></div>
      </div>
      <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-left sm:text-center mb-10 sm:mb-12 font-['Nunito',Helvetica] tracking-[0.5px]">
        Наши контактные данные
      </h3>
      
      <div className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-sky-100 p-3 rounded-full">{item.icon}</div>
              <div>
                <h3 className="font-bold text-gray-800 text-base sm:text-lg font-['Nunito',Helvetica] mb-1">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Карта с формой поверх нее */}
      <div className="w-full h-[650px] sm:h-[550px] rounded-lg overflow-hidden shadow-lg relative">
        <iframe 
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Aae2fd7f1fcf981d6acfe574a3ac7dff9029a7c4e3b2a080f13444de23bc20cae&amp;source=constructor&amp;ll=44.175180%2C56.149604&amp;z=16&amp;pt=44.175180%2C56.149604" 
          width="100%" 
          height="100%" 
          frameBorder="0"
          title="Карта расположения офиса"
          className="filter grayscale-[50%] opacity-95 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        ></iframe>
        
        {/* Форма поверх карты */}
        <Card className="absolute w-[calc(100%-2rem)] left-1/2 top-[5%] transform -translate-x-1/2 sm:left-auto sm:right-[5%] sm:top-1/2 sm:w-[380px] sm:-translate-x-0 sm:-translate-y-1/2 rounded-2xl shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <h3 className="font-bold text-center text-black text-lg sm:text-xl font-['Nunito',Helvetica] mb-4 sm:mb-6">
              Заполнить заявку
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="space-y-1 sm:space-y-2">
                <Select value={formData.service} onValueChange={handleServiceChange}>
                  <SelectTrigger className="w-full h-[40px] sm:h-[45px] rounded-xl border-2 border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-50 transition-all duration-300 text-xs sm:text-sm">
                    <SelectValue placeholder="Выберите услугу" />
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
              
              <div className="space-y-1 sm:space-y-2">
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-[40px] sm:h-[45px] rounded-xl border-2 border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-50 transition-all duration-300 text-xs sm:text-sm"
                  placeholder="Имя"
                  required
                />
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-[40px] sm:h-[45px] rounded-xl border-2 border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-50 transition-all duration-300 text-xs sm:text-sm"
                  placeholder="Email"
                  type="email"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full h-[45px] sm:h-[50px] bg-[#87ceeb] hover:bg-[#65b6d8] rounded-xl transition-all duration-300 mt-3 sm:mt-4 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                disabled={formSubmitted}
              >
                <span className="font-bold text-white text-sm sm:text-base font-['Nunito',Helvetica]">
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