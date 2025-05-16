import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";

// Формспри - ID формы
const FORMSPREE_FORM_ID = "xpwdbdkj";

// Массив услуг с их идентификаторами
const servicesData = [
  {
    id: 1,
    slug: "metal-construction",
    title: "Изготовление, сборка, монтаж металлоконструкций",
    image: "/image-7.png",
    description: "Профессиональное изготовление и монтаж металлоконструкций любой сложности для промышленного и гражданского строительства."
  },
  {
    id: 2,
    slug: "boiler-installation",
    title: "Сборка и монтаж котельных, инженерных систем",
    image: "/image.png",
    description: "Комплексные услуги по установке и монтажу котельных, инженерных систем и газоходов с использованием современных технологий."
  },
  {
    id: 3,
    slug: "ventilation",
    title: "Сборка и монтаж вентиляционных систем",
    image: "/image-2.png",
    description: "Проектирование, изготовление и монтаж вентиляционных систем для жилых и коммерческих помещений с учетом индивидуальных требований."
  },
  {
    id: 4,
    slug: "glazing",
    title: "Остекление зданий",
    image: "/image-3.png",
    description: "Полный спектр услуг по остеклению фасадов зданий с использованием современных материалов, обеспечивающих надежность и энергоэффективность."
  },
  {
    id: 5,
    slug: "insulation",
    title: "Утепление зданий (сайдинг, профлист)",
    image: "/image-4.png",
    description: "Качественное утепление и облицовка фасадов сайдингом и профлистом, увеличивающие энергоэффективность и улучшающие внешний вид здания."
  },
  {
    id: 6,
    slug: "welding",
    title: "Все виды сварочных работ",
    image: "/image-5.png",
    description: "Выполнение всех типов сварочных работ с высокой точностью и качеством. Используем современное оборудование и проверенные технологии."
  },
  {
    id: 7,
    slug: "facade",
    title: "Обустройство фасадов зданий",
    image: "/image-6.png",
    description: "Комплексное оформление и обустройство фасадов зданий с применением различных материалов и технологий для создания привлекательного внешнего вида."
  }
];

export const Services = (): JSX.Element => {
  const [consultationData, setConsultationData] = useState({
    name: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConsultationData(prev => ({ ...prev, [name]: value }));
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка заполненности полей
    if (!consultationData.name || !consultationData.email) {
      alert('Пожалуйста, заполните все поля формы');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Отправка данных через Formspree
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: consultationData.name,
          email: consultationData.email,
          message: 'Запрос консультации с страницы "Услуги"',
          _subject: `Запрос консультации от ${consultationData.name}`,
          _template: "table",
          _captcha: "false"
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке формы');
      }
      
      // Успешная отправка
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Сброс формы и статуса через 5 секунд
      setTimeout(() => {
        setConsultationData({
          name: "",
          email: ""
        });
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      alert('Произошла ошибка при отправке запроса. Пожалуйста, попробуйте позже.');
      setIsSubmitting(false);
    }
  };

  return (
    <Layout showHeroBanner={false}>
      <div className="w-full max-w-[1160px] mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-['Nunito',Helvetica] font-bold text-3xl sm:text-4xl md:text-5xl text-gray-800 tracking-tight">Наши услуги</h1>
          <div className="mt-3 h-1 w-20 bg-[#87ceeb] mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {servicesData.map((service) => (
            <div id={service.slug} key={service.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-full h-[200px] rounded-md overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-['Nunito',Helvetica] font-bold text-2xl text-black mb-2 mt-4">{service.title}</h3>
              <p className="font-['Nunito',Helvetica] text-base text-gray-700 mb-4">
                {service.description}
              </p>
              <Link 
                to={`/services/${service.slug}`} 
                className="inline-block bg-[#87ceeb] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#5fb4d8] transition-colors"
              >
                Подробнее
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-100 p-8 rounded-lg">
          <h2 className="font-['Nunito',Helvetica] font-bold text-3xl text-black mb-4">Нужна консультация?</h2>
          <p className="font-['Nunito',Helvetica] text-lg text-gray-700 mb-6">
            Оставьте свои контактные данные, и наш специалист свяжется с вами для бесплатной консультации.
          </p>
          
          {isSubmitted ? (
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
              <div className="text-green-600 font-semibold text-lg mb-2">Спасибо за ваш запрос!</div>
              <p className="text-gray-700">Наш специалист свяжется с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleConsultationSubmit} className="flex flex-col md:flex-row gap-4">
              <input 
                type="text"
                name="name"
                value={consultationData.name}
                onChange={handleInputChange}
                placeholder="Ваше имя" 
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ceeb]"
                required
              />
              <input 
                type="email"
                name="email"
                value={consultationData.email}
                onChange={handleInputChange}
                placeholder="Ваш email" 
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ceeb]"
                required
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#87ceeb] text-white font-semibold py-3 px-6 rounded-md transition-colors ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#5fb4d8]'
                }`}
              >
                {isSubmitting ? 'Отправка...' : 'Получить консультацию'}
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}; 