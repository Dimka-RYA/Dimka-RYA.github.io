import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Check, Clock, Star, MapPin, Phone, ArrowLeft } from "lucide-react";

// Формспри - замените на ваш формспри ID после регистрации
const FORMSPREE_FORM_ID = "xpwdbdkj"; // Пример ID, нужно заменить на свой

// Интерфейс для типа услуги
interface ServiceType {
  id: number;
  title: string;
  description: string;
  fullDescription: string[];
  image: string;
  gallery: string[];
  benefits: string[];
  price: string;
}

export const ServiceDetail = (): JSX.Element => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
    serviceOption: "standard"
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Данные о всех услугах (в реальном проекте эти данные могли бы приходить с бэкенда)
  const servicesData: Record<string, ServiceType> = {
    "metal-construction": {
      id: 1,
      title: "Изготовление, сборка, монтаж металлоконструкций",
      description: "Профессиональное изготовление и монтаж металлоконструкций любой сложности для промышленного и гражданского строительства.",
      fullDescription: [
        "Наша компания предлагает полный спектр услуг по изготовлению, сборке и монтажу металлоконструкций различной сложности и назначения.",
        "Мы выполняем работы как для частных клиентов, так и для коммерческих и промышленных объектов, гарантируя высокое качество и надежность.",
        "В работе используются только сертифицированные материалы и современное оборудование, что позволяет создавать долговечные конструкции, соответствующие всем строительным нормам и стандартам."
      ],
      image: "/image-7.png",
      gallery: ["/gallery-metal-1.jpg", "/gallery-metal-2.jpg", "/gallery-metal-3.jpg"],
      benefits: [
        "Собственное производство металлоконструкций",
        "Проектирование с учетом всех требований заказчика",
        "Гарантия 5 лет на все металлоконструкции",
        "Строгое соблюдение сроков выполнения работ"
      ],
      price: "от 1500 ₽/м²"
    },
    "boiler-installation": {
      id: 2,
      title: "Сборка и монтаж котельных, инженерных систем",
      description: "Комплексные услуги по установке и монтажу котельных, инженерных систем и газоходов с использованием современных технологий.",
      fullDescription: [
        "Мы специализируемся на проектировании, сборке и монтаже котельных и инженерных систем различной мощности и назначения.",
        "Наши специалисты имеют большой опыт в реализации проектов любой сложности – от небольших частных котельных до промышленных объектов.",
        "Все работы выполняются в соответствии с техническими требованиями, с соблюдением норм безопасности и с использованием качественного оборудования от надежных производителей."
      ],
      image: "/image.png",
      gallery: ["/gallery-boiler-1.jpg", "/gallery-boiler-2.jpg", "/gallery-boiler-3.jpg"],
      benefits: [
        "Комплексный подход: от проектирования до запуска",
        "Опыт работы с различными типами котельного оборудования",
        "Автоматизация котельных и инженерных систем",
        "Сервисное обслуживание после монтажа"
      ],
      price: "от 150 000 ₽"
    },
    "ventilation": {
      id: 3,
      title: "Сборка и монтаж вентиляционных систем",
      description: "Проектирование, изготовление и монтаж вентиляционных систем для жилых и коммерческих помещений с учетом индивидуальных требований.",
      fullDescription: [
        "Наша компания предлагает профессиональные услуги по проектированию, производству и монтажу вентиляционных систем любой сложности.",
        "Мы разрабатываем оптимальные решения для жилых, офисных, торговых и производственных помещений, учитывая все требования к воздухообмену и климатическому комфорту.",
        "Все вентиляционные системы проходят тщательное тестирование и настройку для обеспечения максимальной эффективности и долговечности работы."
      ],
      image: "/image-2.png",
      gallery: ["/gallery-vent-1.jpg", "/gallery-vent-2.jpg", "/gallery-vent-3.jpg"],
      benefits: [
        "Индивидуальное проектирование вентиляционных систем",
        "Собственное производство вентиляционных элементов",
        "Использование энергоэффективного оборудования",
        "Минимальный уровень шума при работе"
      ],
      price: "от 30 000 ₽"
    },
    "glazing": {
      id: 4,
      title: "Остекление зданий",
      description: "Полный спектр услуг по остеклению фасадов зданий с использованием современных материалов, обеспечивающих надежность и энергоэффективность.",
      fullDescription: [
        "Мы выполняем все виды работ по остеклению зданий – от частных домов до многоэтажных офисных и торговых центров.",
        "В работе используются современные энергосберегающие стеклопакеты и профильные системы от ведущих производителей, что гарантирует высокое качество и долговечность.",
        "Наши специалисты выполняют монтаж с соблюдением всех технологических норм, обеспечивая надежную защиту от внешних факторов и отличную теплоизоляцию."
      ],
      image: "/image-3.png",
      gallery: ["/gallery-glazing-1.jpg", "/gallery-glazing-2.jpg", "/gallery-glazing-3.jpg"],
      benefits: [
        "Работа с различными типами остекления (витражное, структурное, панорамное)",
        "Установка энергосберегающих стеклопакетов",
        "Гарантия герметичности и теплоизоляции",
        "Быстрые сроки выполнения работ"
      ],
      price: "от 5000 ₽/м²"
    },
    "insulation": {
      id: 5,
      title: "Утепление зданий (сайдинг, профлист)",
      description: "Качественное утепление и облицовка фасадов сайдингом и профлистом, увеличивающие энергоэффективность и улучшающие внешний вид здания.",
      fullDescription: [
        "Наша компания предлагает комплексные решения по утеплению и облицовке фасадов зданий с использованием современных материалов и технологий.",
        "Мы работаем с различными типами отделочных материалов – сайдинг, профлист, фасадные панели, обеспечивая качественную теплоизоляцию и привлекательный внешний вид.",
        "Все работы выполняются в соответствии с технологическими требованиями, с учетом климатических особенностей региона для обеспечения максимальной энергоэффективности зданий."
      ],
      image: "/image-4.png",
      gallery: ["/gallery-insulation-1.jpg", "/gallery-insulation-2.jpg", "/gallery-insulation-3.jpg"],
      benefits: [
        "Комплексный подход к утеплению фасадов",
        "Широкий выбор материалов для отделки",
        "Значительное снижение теплопотерь здания",
        "Защита конструкций от воздействия окружающей среды"
      ],
      price: "от 1200 ₽/м²"
    },
    "welding": {
      id: 6,
      title: "Все виды сварочных работ",
      description: "Выполнение всех типов сварочных работ с высокой точностью и качеством. Используем современное оборудование и проверенные технологии.",
      fullDescription: [
        "Мы предоставляем профессиональные услуги по выполнению всех видов сварочных работ как для частных клиентов, так и для коммерческих и промышленных объектов.",
        "Наши сварщики имеют высокую квалификацию и большой опыт работы с различными материалами и в разных условиях, что позволяет нам гарантировать качество и надежность сварных соединений.",
        "В работе используется современное сварочное оборудование, которое обеспечивает высокую точность и чистоту сварных швов."
      ],
      image: "/image-5.png",
      gallery: ["/gallery-welding-1.jpg", "/gallery-welding-2.jpg", "/gallery-welding-3.jpg"],
      benefits: [
        "Выполнение всех видов сварки (MIG/MAG, TIG, ручная дуговая)",
        "Работа с любыми металлами и сплавами",
        "Изготовление металлоконструкций по индивидуальным чертежам",
        "Выезд на объект заказчика"
      ],
      price: "от 1000 ₽/час"
    },
    "facade": {
      id: 7,
      title: "Обустройство фасадов зданий",
      description: "Комплексное оформление и обустройство фасадов зданий с применением различных материалов и технологий для создания привлекательного внешнего вида.",
      fullDescription: [
        "Наша компания предлагает полный комплекс услуг по обустройству и отделке фасадов зданий любого назначения и сложности.",
        "Мы работаем с широким спектром отделочных материалов и технологий, что позволяет подобрать оптимальное решение для каждого конкретного объекта с учетом архитектурных особенностей и пожеланий заказчика.",
        "Все работы выполняются с соблюдением строительных норм и правил, с гарантией качества и долговечности результата."
      ],
      image: "/image-6.png",
      gallery: ["/gallery-facade-1.jpg", "/gallery-facade-2.jpg", "/gallery-facade-3.jpg"],
      benefits: [
        "Индивидуальный подход к каждому проекту",
        "Широкий выбор фасадных систем и материалов",
        "Комплексное решение: от проектирования до реализации",
        "Гарантийное обслуживание выполненных работ"
      ],
      price: "от 2000 ₽/м²"
    }
  };

  // Получение данных выбранной услуги
  const service = serviceId ? servicesData[serviceId] : null;

  // Обработчик изменения полей формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Обработчик выбора опции сервиса
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, serviceOption: value }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsFormSubmitted(true);
      
      // Формирование данных для отправки
      const formDataToSend = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || 'Не указан',
        address: formData.address || 'Не указан',
        service: service?.title || 'Не указана',
        serviceOption: formData.serviceOption,
        message: formData.message || 'Без дополнительной информации',
        _subject: `Заявка на услугу: ${service?.title || 'Не указана'}`,
        _template: "table",
        _captcha: "false"
      };

      // Отправка данных через Formspree
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataToSend)
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке формы');
      }
      
      // Сброс формы через 5 секунд после успешной отправки
      setTimeout(() => {
        setIsFormSubmitted(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          message: "",
          serviceOption: "standard"
        });
      }, 5000);
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
      setIsFormSubmitted(false);
    }
  };

  // Если услуга не найдена
  if (!service) {
    return (
      <Layout showHeroBanner={false}>
        <div className="w-full max-w-[1160px] mx-auto py-10">
          <div className="text-center">
            <h1 className="font-['Nunito',Helvetica] font-bold text-4xl text-black mb-4">Услуга не найдена</h1>
            <p className="text-gray-600 mb-6">К сожалению, запрашиваемая услуга не существует.</p>
            <Link to="/services" className="inline-flex items-center justify-center gap-2 bg-[#87ceeb] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#5fb4d8] transition-colors">
              <ArrowLeft size={16} />
              Вернуться к услугам
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showHeroBanner={false}>
      <div className="w-full max-w-[1160px] mx-auto py-10">
        {/* Навигационная цепочка */}
        <div className="mb-6 flex items-center font-['Nunito',Helvetica] text-sm text-gray-500">
          <Link to="/" className="hover:text-[#87ceeb] transition-colors">Главная</Link>
          <span className="mx-2">/</span>
          <Link to="/services" className="hover:text-[#87ceeb] transition-colors">Услуги</Link>
          <span className="mx-2">/</span>
          <span className="text-[#87ceeb]">{service.title}</span>
        </div>

        {/* Заголовок услуги */}
        <h1 className="font-['Nunito',Helvetica] font-bold text-4xl text-black mb-6">{service.title}</h1>

        {/* Верхний блок с изображением и кратким описанием */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="font-['Nunito',Helvetica] font-semibold text-2xl text-black mb-4">О услуге</h2>
              {service.fullDescription.map((paragraph, index) => (
                <p key={index} className="font-['Nunito',Helvetica] text-gray-700 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="font-['Nunito',Helvetica] font-bold text-2xl text-[#87ceeb]">
                  {service.price}
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} size={16} fill="#FFD700" color="#FFD700" />
                  ))}
                </div>
              </div>
              <Button 
                className="w-full bg-[#87ceeb] hover:bg-[#5fb4d8] transition-colors text-white font-bold py-3 rounded-xl"
                onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Заказать услугу
              </Button>
            </div>
          </div>
        </div>

        {/* Преимущества услуги */}
        <div className="mb-12">
          <h2 className="font-['Nunito',Helvetica] font-semibold text-2xl text-black mb-6">Преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="bg-[#87ceeb] rounded-full p-1 mt-1">
                  <Check size={16} className="text-white" />
                </div>
                <p className="font-['Nunito',Helvetica] text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Форма заказа */}
        <div id="order-form" className="bg-gray-50 p-8 rounded-xl shadow-md">
          <h2 className="font-['Nunito',Helvetica] font-semibold text-2xl text-black mb-6 text-center">Заказать услугу</h2>
          
          {isFormSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-green-600" size={24} />
              </div>
              <h3 className="font-['Nunito',Helvetica] font-semibold text-xl text-green-800 mb-2">Заявка успешно отправлена!</h3>
              <p className="text-green-700">Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-['Nunito',Helvetica] font-medium text-gray-700">Ваше имя *</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full h-12 rounded-lg border-2 border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-50"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-['Nunito',Helvetica] font-medium text-gray-700">Телефон *</label>
                  <Input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full h-12 rounded-lg border-2 border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-50"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-['Nunito',Helvetica] font-medium text-gray-700">Email</label>
                  <Input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-12 rounded-lg border-2 border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-50"
                    placeholder="example@mail.ru"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-['Nunito',Helvetica] font-medium text-gray-700">Адрес объекта</label>
                  <Input 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full h-12 rounded-lg border-2 border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-50"
                    placeholder="г. Кстово, ул. Ленина, д. 10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block font-['Nunito',Helvetica] font-medium text-gray-700">Тип услуги</label>
                <Select 
                  value={formData.serviceOption}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="w-full h-12 rounded-lg border-2 border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-50">
                    <SelectValue placeholder="Выберите тип услуги" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Стандартный пакет</SelectItem>
                    <SelectItem value="premium">Премиум пакет</SelectItem>
                    <SelectItem value="custom">Индивидуальный заказ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="block font-['Nunito',Helvetica] font-medium text-gray-700">Дополнительная информация</label>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full min-h-[120px] rounded-lg border-2 border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-50"
                  placeholder="Опишите ваши пожелания, требования или вопросы..."
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-[#87ceeb] hover:bg-[#5fb4d8] transition-colors text-white font-bold py-4 rounded-xl"
              >
                Отправить заявку
              </Button>

              <div className="text-center text-sm text-gray-500 mt-4">
                <p>Нажимая на кнопку, вы соглашаетесь с нашей политикой конфиденциальности</p>
              </div>
            </form>
          )}
        </div>

        {/* Контактная информация */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="font-['Nunito',Helvetica] font-semibold text-2xl text-black mb-6 text-center">Остались вопросы?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#e6f7ff] rounded-full flex items-center justify-center mb-4">
                <Phone className="text-[#87ceeb]" size={20} />
              </div>
              <h3 className="font-['Nunito',Helvetica] font-medium text-gray-800 mb-1">Позвоните нам</h3>
              <p className="text-[#87ceeb] font-medium">+7 (831) 216-61-49</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#e6f7ff] rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-[#87ceeb]" size={20} />
              </div>
              <h3 className="font-['Nunito',Helvetica] font-medium text-gray-800 mb-1">Наш адрес</h3>
              <p className="text-gray-600">г. Кстово, д. 5 А, оф.42</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#e6f7ff] rounded-full flex items-center justify-center mb-4">
                <Clock className="text-[#87ceeb]" size={20} />
              </div>
              <h3 className="font-['Nunito',Helvetica] font-medium text-gray-800 mb-1">Режим работы</h3>
              <p className="text-gray-600">Пн-Пт: 9:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}; 