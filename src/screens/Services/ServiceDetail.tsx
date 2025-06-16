import React, { useState, FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Check, Clock, Star, MapPin, Phone, ArrowLeft } from "lucide-react";
import { saveFormSubmission } from "../../lib/supabase";

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
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null as string | null
  });

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
  const handleSubmit = async (e: FormEvent): Promise<void> => {
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
      console.log('Начинаем отправку заказа услуги в Supabase:', formData);
      
      if (!service) {
        throw new Error('Услуга не найдена');
      }
      
      // Отправка данных в Supabase
      const result = await saveFormSubmission({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        type: 'service', // Тип формы - заказ услуги
        service: service.title,
        serviceOption: formData.serviceOption,
        address: formData.address
      });
      
      console.log('Результат отправки:', result);
      
      if (!result.success) {
        console.error('Ошибка при отправке заказа:', result.error);
        throw new Error(result.error ? (result.error as any).message || 'Ошибка при отправке заказа' : 'Ошибка при отправке заказа');
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
        message: '',
        serviceOption: 'standard',
        address: ''
      });
      
      // Сброс статуса "отправлено" через 5 секунд
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, isSubmitted: false }));
      }, 5000);
    } catch (error: any) {
      // Обработка ошибки
      console.error('Ошибка при отправке заказа:', error);
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: `Произошла ошибка при отправке заказа: ${error.message || 'Неизвестная ошибка'}. Пожалуйста, попробуйте позже.`
      });
    }
  };

  // Если услуга не найдена, показываем сообщение об ошибке
  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Услуга не найдена</h1>
          <p className="mb-6">Запрашиваемая услуга не существует или была удалена.</p>
          <Link to="/services" className="text-blue-600 hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={16} />
            Вернуться к списку услуг
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Основной контент */}
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#87ceeb]">Главная</Link>
          <span className="mx-2">/</span>
          <Link to="/services" className="hover:text-[#87ceeb]">Услуги</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{service.title}</span>
        </div>
        
        {/* Заголовок услуги */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
          <div className="h-1 w-20 bg-[#87ceeb] rounded-full"></div>
        </div>
        
        {/* Основная информация */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden mb-6 h-80 md:h-96">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="prose max-w-none mb-8">
              {service.fullDescription.map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
              ))}
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Преимущества нашей услуги</h3>
              <ul className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 bg-[#87ceeb] rounded-full flex items-center justify-center mt-1 mr-3">
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Галерея работ</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {service.gallery.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden h-48">
                    <img 
                      src={image} 
                      alt={`${service.title} - изображение ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Стоимость</h3>
                  <span className="text-lg font-bold text-[#87ceeb]">{service.price}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Clock size={18} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">Срок выполнения: 5-10 дней</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={18} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">Гарантия качества</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={18} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">Выезд на объект</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={18} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">Бесплатная консультация</span>
                  </div>
                </div>
              </div>
              
              <div id="order-form" className="p-6">
                <h2 className="font-['Nunito',Helvetica] font-semibold text-2xl text-black mb-6 text-center">Заказать услугу</h2>
                
                {formStatus.isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={24} className="text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-green-800 mb-2">Заявка отправлена!</h3>
                    <p className="text-green-700">Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {formStatus.error && (
                      <div className="bg-red-50 border border-red-200 p-4 rounded-md">
                        <p className="text-red-700 text-sm">{formStatus.error}</p>
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Ваше имя <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Иван Иванов"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Телефон <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+7 (___) ___-__-__"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@mail.ru"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Адрес объекта
                      </label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="г. Москва, ул. Примерная, д. 1"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="serviceOption" className="block text-sm font-medium text-gray-700 mb-1">
                        Вариант услуги
                      </label>
                      <Select 
                        value={formData.serviceOption} 
                        onValueChange={handleSelectChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите вариант" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Стандартный пакет</SelectItem>
                          <SelectItem value="premium">Премиум пакет</SelectItem>
                          <SelectItem value="custom">Индивидуальный заказ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Дополнительная информация
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Опишите ваши пожелания или задайте вопросы..."
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#87ceeb] hover:bg-[#5fb4d8]"
                      disabled={formStatus.isSubmitting}
                    >
                      {formStatus.isSubmitting ? "Отправка..." : "Заказать услугу"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}; 