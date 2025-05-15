import React from "react";
import { Layout } from "../../components/Layout";
import { MailIcon, MapPinIcon, PhoneIcon, ClockIcon } from "lucide-react";

export const Contacts = (): JSX.Element => {
  return (
    <Layout showHeroBanner={false}>
      <div className="w-full max-w-[1160px] mx-auto py-10">
        <h1 className="font-['Nunito',Helvetica] font-bold text-4xl text-black mb-8">Контакты</h1>
        
        <div className="flex flex-col md:flex-row gap-10 mb-12">
          <div className="md:w-1/2">
            <h2 className="font-['Nunito',Helvetica] font-bold text-2xl text-black mb-6">Наши контактные данные</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#87ceeb] rounded-full flex items-center justify-center mr-4">
                  <PhoneIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-['Nunito',Helvetica] font-bold text-xl text-black mb-1">Телефон</h3>
                  <p className="font-['Nunito',Helvetica] text-lg text-gray-700">+7 (831) 216-61-49</p>
                  <p className="font-['Nunito',Helvetica] text-lg text-gray-700">+7 (999) 123-45-67</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#87ceeb] rounded-full flex items-center justify-center mr-4">
                  <MailIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-['Nunito',Helvetica] font-bold text-xl text-black mb-1">Электронная почта</h3>
                  <p className="font-['Nunito',Helvetica] text-lg text-gray-700">info@ipmaslyakov.ru</p>
                  <p className="font-['Nunito',Helvetica] text-lg text-gray-700">support@ipmaslyakov.ru</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#87ceeb] rounded-full flex items-center justify-center mr-4">
                  <MapPinIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-['Nunito',Helvetica] font-bold text-xl text-black mb-1">Адрес</h3>
                  <p className="font-['Nunito',Helvetica] text-lg text-gray-700">г. Кстово, д. 5 А, офис 42</p>
                  <p className="font-['Nunito',Helvetica] text-lg text-gray-700">Нижегородская область, 607650</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#87ceeb] rounded-full flex items-center justify-center mr-4">
                  <ClockIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-['Nunito',Helvetica] font-bold text-xl text-black mb-1">Режим работы</h3>
                  <p className="font-['Nunito',Helvetica] text-lg text-gray-700">Пн-Пт: 9:00 - 18:00</p>
                  <p className="font-['Nunito',Helvetica] text-lg text-gray-700">Сб-Вс: выходной</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h2 className="font-['Nunito',Helvetica] font-bold text-2xl text-black mb-6">Отправить сообщение</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-['Nunito',Helvetica] font-semibold text-base text-gray-700 mb-1">Ваше имя</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ceeb]"
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label className="block font-['Nunito',Helvetica] font-semibold text-base text-gray-700 mb-1">Ваш телефон</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ceeb]"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                <label className="block font-['Nunito',Helvetica] font-semibold text-base text-gray-700 mb-1">Ваш email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ceeb]"
                  placeholder="example@mail.ru"
                />
              </div>
              <div>
                <label className="block font-['Nunito',Helvetica] font-semibold text-base text-gray-700 mb-1">Сообщение</label>
                <textarea 
                  className="w-full px-4 py-3 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#87ceeb]"
                  placeholder="Введите ваше сообщение..."
                ></textarea>
              </div>
              <button className="bg-[#87ceeb] text-white font-semibold py-3 px-8 rounded-md hover:bg-[#5fb4d8] transition-colors">
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="font-['Nunito',Helvetica] font-bold text-2xl text-black mb-6">Наше местоположение</h2>
          <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
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
          <h2 className="font-['Nunito',Helvetica] font-bold text-3xl text-black mb-4">Мы в социальных сетях</h2>
          <p className="font-['Nunito',Helvetica] text-lg text-gray-700 mb-6">
            Следите за нашими новостями и акциями в социальных сетях.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#87ceeb] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#5fb4d8] transition-colors">
              ВКонтакте
            </button>
            <button className="bg-[#87ceeb] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#5fb4d8] transition-colors">
              Telegram
            </button>
            <button className="bg-[#87ceeb] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#5fb4d8] transition-colors">
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}; 