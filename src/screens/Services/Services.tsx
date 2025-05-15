import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";

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
  return (
    <Layout showHeroBanner={false}>
      <div className="w-full max-w-[1160px] mx-auto py-10">
        <h1 className="font-['Nunito',Helvetica] font-bold text-4xl text-black mb-8">Наши услуги</h1>
        
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
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Ваше имя" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ceeb]"
            />
            <input 
              type="tel" 
              placeholder="Ваш телефон" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ceeb]"
            />
            <button className="bg-[#87ceeb] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#5fb4d8] transition-colors">
              Получить консультацию
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}; 