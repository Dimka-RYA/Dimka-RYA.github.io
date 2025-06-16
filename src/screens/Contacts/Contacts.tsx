import React, { useEffect, useState, FormEvent } from "react";
import { Layout } from "../../components/Layout";
import { MailIcon, MapPinIcon, PhoneIcon, ClockIcon } from "lucide-react";
import { saveFormSubmission } from "../../lib/supabase";

// Формспри - замените на ваш формспри ID после регистрации
const FORMSPREE_FORM_ID = "xpwdbdkj"; // Пример ID, нужно заменить на свой

export const Contacts = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Состояние для данных формы
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  // Состояние для отслеживания статуса отправки
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null as string | null
  });

  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Валидация формы
    if (!formData.name || !formData.phone || !formData.email) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Пожалуйста, заполните все обязательные поля'
      });
      return;
    }

    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      error: null
    });

    try {
      console.log('Начинаем отправку формы в Supabase:', formData);
      // Отправка данных в Supabase
      const result = await saveFormSubmission({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        type: 'contact' // Тип формы - контактная форма
      });

      console.log('Результат отправки:', result);

      if (!result.success) {
        console.error('Ошибка при отправке формы:', result.error);
        throw new Error(result.error ? (result.error as any).message || 'Ошибка при отправке формы' : 'Ошибка при отправке формы');
      }

      // Успешная отправка
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });

      // Сброс формы
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });

      // Сброс статуса "отправлено" через 5 секунд
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, isSubmitted: false }));
      }, 5000);
    } catch (error: any) {
      // Обработка ошибки
      console.error('Ошибка при отправке формы:', error);
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: `Произошла ошибка при отправке сообщения: ${error.message || 'Неизвестная ошибка'}. Пожалуйста, попробуйте позже.`
      });
    }
  };

  return (
    <Layout showHeroBanner={false}>
      <div className="w-full max-w-[1160px] mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-['Nunito',Helvetica] font-bold text-3xl sm:text-4xl md:text-5xl text-gray-800 tracking-tight">Контакты</h1>
          <div className="mt-3 h-1 w-20 bg-[#87ceeb] mx-auto rounded-full"></div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-stretch gap-8 mb-10">
          <div className="md:w-1/2">
            <h2 className="font-['Nunito',Helvetica] font-bold text-xl sm:text-2xl text-black mb-4 sm:mb-6">Наши контактные данные</h2>
            
            <div className="space-y-4 sm:space-y-5">
              {[
                {
                  icon: <PhoneIcon className="w-6 h-6 text-white" />,
                  title: "Телефон",
                  details: [
                    { text: "+7 (831) 216-61-49" },
                    { text: "+7 (999) 123-45-67" }
                  ]
                },
                {
                  icon: <MailIcon className="w-6 h-6 text-white" />,
                  title: "Электронная почта",
                  details: [
                    { text: "info@ipmaslyakov.ru" },
                    { text: "support@ipmaslyakov.ru" }
                  ]
                },
                {
                  icon: <MapPinIcon className="w-6 h-6 text-white" />,
                  title: "Адрес",
                  details: [
                    { text: "г. Кстово, д. 5 А, офис 42" },
                    { text: "Нижегородская область, 607650" }
                  ]
                },
                {
                  icon: <ClockIcon className="w-6 h-6 text-white" />,
                  title: "Режим работы",
                  details: [
                    { text: "Пн-Пт: 9:00 - 18:00" },
                    { text: "Сб-Вс: выходной" }
                  ]
                }
              ].map((contactItem, index) => (
                <div key={index} className="flex items-start bg-white p-4 sm:p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-[#87ceeb] rounded-full flex items-center justify-center mr-4 sm:mr-5 shrink-0">
                    {contactItem.icon}
                  </div>
                  <div>
                    <h3 className="font-['Nunito',Helvetica] font-bold text-lg sm:text-xl text-black mb-1">{contactItem.title}</h3>
                    {contactItem.details.map((detail, i) => (
                      <p key={i} className="font-['Nunito',Helvetica] text-base sm:text-lg text-gray-700">{detail.text}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div id="contact-form-section" className="md:w-1/2 md:flex md:flex-col">
            <h2 className="font-['Nunito',Helvetica] font-bold text-xl sm:text-2xl text-black mb-4 sm:mb-6">Отправить сообщение</h2>
            
            {formStatus.isSubmitted ? (
              <div className="bg-green-50 p-6 rounded-lg shadow-md border border-green-200 text-center md:flex-grow">
                <div className="text-green-600 font-semibold text-lg mb-2">Спасибо за ваше сообщение!</div>
                <p className="text-gray-700">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 md:flex-grow">
                {formStatus.error && (
                  <div className="bg-red-50 p-3 rounded-md text-red-700 text-sm mb-2">
                    {formStatus.error}
                  </div>
                )}
                <div>
                  <label className="block font-['Nunito',Helvetica] font-semibold text-sm sm:text-base text-gray-700 mb-1">
                    Ваше имя <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ceeb] transition-colors duration-300 text-sm sm:text-base"
                    placeholder="Иван Иванов"
                    required
                  />
                </div>
                <div>
                  <label className="block font-['Nunito',Helvetica] font-semibold text-sm sm:text-base text-gray-700 mb-1">
                    Ваш телефон <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ceeb] transition-colors duration-300 text-sm sm:text-base"
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                </div>
                <div>
                  <label className="block font-['Nunito',Helvetica] font-semibold text-sm sm:text-base text-gray-700 mb-1">
                    Ваш email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ceeb] transition-colors duration-300 text-sm sm:text-base"
                    placeholder="example@mail.ru"
                    required
                  />
                </div>
                <div>
                  <label className="block font-['Nunito',Helvetica] font-semibold text-sm sm:text-base text-gray-700 mb-1">Сообщение</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md h-28 sm:h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#87ceeb] transition-colors duration-300 text-sm sm:text-base"
                    placeholder="Введите ваше сообщение..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={formStatus.isSubmitting}
                  className={`w-full sm:w-auto bg-[#87ceeb] text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 ${
                    formStatus.isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#5fb4d8]'
                  }`}
                >
                  {formStatus.isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="mb-10 sm:mb-12">
          <h2 className="font-['Nunito',Helvetica] font-bold text-xl sm:text-2xl text-black mb-4 sm:mb-6">Наше местоположение</h2>
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
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
        
        <div className="bg-sky-50 p-6 sm:p-8 rounded-lg">
          <h2 className="font-['Nunito',Helvetica] font-bold text-2xl sm:text-3xl text-black mb-4">Мы в социальных сетях</h2>
          <p className="font-['Nunito',Helvetica] text-base sm:text-lg text-gray-700 mb-6">
            Следите за нашими новостями и акциями в социальных сетях.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button className="bg-[#87ceeb] text-white font-semibold py-2 sm:py-3 px-5 sm:px-6 rounded-md hover:bg-[#5fb4d8] transition-colors duration-300 hover:shadow-md transform hover:-translate-y-0.5">
              ВКонтакте
            </button>
            <button className="bg-[#87ceeb] text-white font-semibold py-2 sm:py-3 px-5 sm:px-6 rounded-md hover:bg-[#5fb4d8] transition-colors duration-300 hover:shadow-md transform hover:-translate-y-0.5">
              Telegram
            </button>
            <button className="bg-[#87ceeb] text-white font-semibold py-2 sm:py-3 px-5 sm:px-6 rounded-md hover:bg-[#5fb4d8] transition-colors duration-300 hover:shadow-md transform hover:-translate-y-0.5">
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}; 