import React from "react";
import { Layout } from "../../components/Layout";
import { Link } from "react-router-dom";

export const About = (): JSX.Element => {
  // Team members data with names, positions, and photos
  const teamMembers = [
    {
      id: 1,
      name: "Александр Петров",
      position: "Главный инженер",
      photo: "/360_F_118124400_dJVcyLOxzDViOg57o19suHnfbXjRsT1M.jpg",
      experience: "Опыт работы более 10 лет. Специализируется на проектировании и планировании ремонтных работ."
    },
    {
      id: 2,
      name: "Елена Смирнова",
      position: "Дизайнер интерьеров",
      photo: "/360_F_118124400_dJVcyLOxzDViOg57o19suHnfbXjRsT1M.jpg",
      experience: "Опыт работы более 7 лет. Создает уникальные дизайн-проекты для жилых и коммерческих помещений."
    },
    {
      id: 3,
      name: "Дмитрий Иванов",
      position: "Прораб",
      photo: "/360_F_118124400_dJVcyLOxzDViOg57o19suHnfbXjRsT1M.jpg",
      experience: "Опыт работы более 8 лет. Контролирует все этапы ремонтно-строительных работ."
    },
    {
      id: 4,
      name: "Ольга Козлова",
      position: "Менеджер проектов",
      photo: "/360_F_118124400_dJVcyLOxzDViOg57o19suHnfbXjRsT1M.jpg",
      experience: "Опыт работы более 5 лет. Координирует работу команды и взаимодействие с клиентами."
    }
  ];

  return (
    <Layout showHeroBanner={false}>
      <div className="w-full max-w-[1160px] mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-['Nunito',Helvetica] font-bold text-3xl sm:text-4xl md:text-5xl text-gray-800 tracking-tight">
            О компании
          </h1>
          <div className="mt-3 h-1 w-20 bg-[#87ceeb] mx-auto rounded-full"></div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-stretch items-start gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="md:w-1/2 bg-white p-6 sm:p-8 rounded-lg shadow-lg order-2 md:order-1 flex flex-col justify-center">
            <p className="font-['Nunito',Helvetica] text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              ИП Масляков - компания с многолетним опытом работы в сфере ремонта и отделки помещений. Мы предоставляем широкий спектр услуг для частных и коммерческих клиентов в городе Кстово и области.
            </p>
            <p className="font-['Nunito',Helvetica] text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              Наша команда состоит из опытных специалистов, которые постоянно совершенствуют свои навыки и следят за последними тенденциями в области ремонта и отделки.
            </p>
            <p className="font-['Nunito',Helvetica] text-base sm:text-lg text-gray-700 leading-relaxed">
              Мы гордимся качеством нашей работы и стремимся к полному удовлетворению потребностей клиентов, предлагая индивидуальный подход к каждому проекту.
            </p>
          </div>
          <div className="md:w-1/2 w-full h-[250px] sm:h-[300px] md:h-auto md:flex rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
            <img 
              src="/image-1.png" 
              alt="Фото компании" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="font-['Nunito',Helvetica] font-bold text-3xl text-black mb-6">Наши преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-[#87ceeb] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="font-bold text-white text-xl">10+</span>
              </div>
              <h3 className="font-['Nunito',Helvetica] font-bold text-xl text-black mb-2">Лет опыта</h3>
              <p className="font-['Nunito',Helvetica] text-base text-gray-700">
                Более 10 лет мы успешно реализуем проекты различной сложности
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-[#87ceeb] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="font-bold text-white text-xl">500+</span>
              </div>
              <h3 className="font-['Nunito',Helvetica] font-bold text-xl text-black mb-2">Завершенных проектов</h3>
              <p className="font-['Nunito',Helvetica] text-base text-gray-700">
                Сотни довольных клиентов и успешно реализованных проектов
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-[#87ceeb] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="font-bold text-white text-xl">100%</span>
              </div>
              <h3 className="font-['Nunito',Helvetica] font-bold text-xl text-black mb-2">Гарантия качества</h3>
              <p className="font-['Nunito',Helvetica] text-base text-gray-700">
                Мы предоставляем гарантию на все виды выполняемых работ
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="font-['Nunito',Helvetica] font-bold text-3xl text-black mb-6">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white p-4 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-full h-[220px] rounded-md mb-4 overflow-hidden">
                  <img 
                    src={member.photo} 
                    alt={`${member.name} - ${member.position}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-['Nunito',Helvetica] font-bold text-xl text-black mb-1">{member.name}</h3>
                <p className="font-['Nunito',Helvetica] text-[#87ceeb] font-semibold mb-2">{member.position}</p>
                <p className="font-['Nunito',Helvetica] text-sm text-gray-700">
                  {member.experience}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="font-['Nunito',Helvetica] font-bold text-3xl text-black mb-6">Наше местоположение</h2>
          <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Aae2fd7f1fcf981d6acfe574a3ac7dff9029a7c4e3b2a080f13444de23bc20cae&amp;source=constructor&amp;ll=44.175180%2C56.149604&amp;z=16&amp;pt=44.175180%2C56.149604" 
              width="100%" 
              height="100%" 
              frameBorder="0"
              title="Карта расположения офиса"
              className="filter grayscale-[50%] opacity-95 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            ></iframe>
          </div>
        </div>
        
        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="font-['Nunito',Helvetica] font-bold text-3xl text-black mb-4">Остались вопросы?</h2>
          <p className="font-['Nunito',Helvetica] text-lg text-gray-700 mb-6">
            Свяжитесь с нами любым удобным способом, и мы ответим на все ваши вопросы.
          </p>
          <Link 
            to="/contacts" 
            className="inline-block bg-[#87ceeb] text-white font-semibold py-3 px-8 rounded-md hover:bg-[#5fb4d8] transition-colors duration-300 hover:shadow-lg transform hover:-translate-y-0.5 text-center"
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </Layout>
  );
}; 