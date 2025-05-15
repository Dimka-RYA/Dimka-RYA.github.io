import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

interface HeaderByAnimaProps {
  showHeroBanner?: boolean;
}

export const HeaderByAnima = ({ showHeroBanner = true }: HeaderByAnimaProps): JSX.Element => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Состояние для слайдера
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Массив изображений для слайдера
  const sliderImages = [
    '/image-1.png',
    '/image-2.png',
    '/image-3.png',
    '/image-4.png'
  ];
  
  // Функция для перехода к следующему слайду
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };
  
  // Функция для перехода к предыдущему слайду
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };
  
  // Автоматическое переключение слайдов каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Navigation menu items data
  const navItems = [
    { text: "Главная", active: currentPath === "/", path: "/" },
    { text: "Услуги", active: currentPath === "/services", path: "/services" },
    { text: "О компании", active: currentPath === "/about", path: "/about" },
    { text: "Контакты", active: currentPath === "/contacts", path: "/contacts" },
  ];

  return (
    <header className={`relative w-full max-w-[1600px] mx-auto ${showHeroBanner ? 'h-[690px]' : 'h-[105px]'} mt-[50px]`}>
      <div className="relative w-full max-w-[1160px] h-[65px] mx-auto">
        {/* Logo and company name */}
        <div className="absolute w-[246px] h-[65px] top-0 left-0 flex items-center">
          <Link to="/" className="flex items-center">
            <div className="w-[65px] h-[65px] bg-[#d9d9d9] flex items-center justify-center">
              <div className="font-['Nunito',Helvetica] font-extrabold text-black text-xl">
                ЛОГО
              </div>
            </div>
            <div className="ml-4 font-['Nunito',Helvetica] font-extrabold text-black text-2xl">
              ИП Масляков
            </div>
          </Link>
        </div>

        {/* Navigation menu */}
        <NavigationMenu className="absolute top-[19px] left-[380px]">
          <NavigationMenuList className="flex gap-8">
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link to={item.path}>
                  <NavigationMenuLink
                    className={`font-['Nunito',Helvetica] font-semibold text-xl ${item.active ? "text-[#87ceeb]" : "text-black"}`}
                  >
                    {item.text}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Contact information */}
        <div className="absolute top-[5px] left-[900px] font-['Nunito',Helvetica] font-semibold text-base">
          <span className="text-black">Город: </span>
          <span className="text-[#87ceeb]">
            Кстово
            <br />
          </span>
          <span className="text-black">Наш адрес: г. Кстово д. 5 А, оф.42</span>
        </div>
      </div>

      {/* Hero banner - only show if showHeroBanner is true */}
      {showHeroBanner && (
        <div className="relative w-full h-[585px] mt-[40px] overflow-hidden">
          {/* Слайдер */}
          <div 
            className="w-full h-full relative transition-all duration-500 ease-in-out"
            style={{ 
              backgroundImage: `url(${sliderImages[currentSlide]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Оверлей для лучшей видимости контента */}
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            
            {/* Здесь может быть контент слайда, например заголовок */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h1 className="text-5xl font-bold mb-4 text-shadow-lg max-w-3xl text-center opacity-90">Профессиональные строительные и ремонтные услуги</h1>
              <p className="text-xl max-w-2xl text-center opacity-80">Качество, проверенное временем</p>
            </div>
          </div>

          {/* Navigation arrows */}
          <button 
            className="absolute w-11 h-11 top-[270px] left-[30px] flex items-center justify-center z-10 hover:scale-110 transition-transform duration-300"
            onClick={prevSlide}
          >
            <ChevronLeftIcon className="w-11 h-11 text-white drop-shadow-lg" />
          </button>

          <button 
            className="absolute w-11 h-11 top-[270px] right-[30px] flex items-center justify-center z-10 hover:scale-110 transition-transform duration-300"
            onClick={nextSlide}
          >
            <ChevronRightIcon className="w-11 h-11 text-white drop-shadow-lg" />
          </button>

          {/* Pagination dots */}
          <div className="absolute w-auto h-[10px] bottom-[33px] left-1/2 -translate-x-1/2 flex gap-[10px] z-10">
            {sliderImages.map((_, index) => (
              <div
                key={index}
                className={`w-[10px] h-[10px] rounded-full cursor-pointer transition-all duration-300 ${
                  currentSlide === index ? "bg-white scale-110" : "bg-white/60 hover:bg-white/80"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
