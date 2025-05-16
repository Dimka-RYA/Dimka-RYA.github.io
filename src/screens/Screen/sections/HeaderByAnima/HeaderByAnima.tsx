import { ChevronLeftIcon, ChevronRightIcon, Menu as MenuIcon, X as XIcon, MoreHorizontal } from "lucide-react";
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMoreNav, setShowMoreNav] = useState(false);
  const MAX_VISIBLE_NAV_ITEMS_ON_MD = 2;

  const visibleNavItemsOnMd = navItems.slice(0, MAX_VISIBLE_NAV_ITEMS_ON_MD);
  const hiddenNavItemsOnMd = navItems.slice(MAX_VISIBLE_NAV_ITEMS_ON_MD);

  return (
    <header className="relative w-full max-w-[1600px] mx-auto mt-[50px]">
      <div className="flex items-center justify-between w-full max-w-[1160px] mx-auto py-4 gap-4 px-4 md:px-0 transition-all duration-300 ease-in-out">
        {/* Logo and company name */}
        <Link to="/" className="flex items-center">
          <div className="w-[65px] h-[65px] flex items-center justify-center">
            <img src="/stroi_logo_1-_1_-_1_.ico" alt="Логотип ИП Масляков" className="w-[60px] h-[60px]" />
          </div>
          <div className="ml-4 font-['Nunito',Helvetica] font-extrabold text-black text-2xl">
            ИП Масляков
          </div>
        </Link>

        <button className="block md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>

        {/* Navigation menu for LG screens and wider (all items visible) */}
        <NavigationMenu className="hidden lg:flex items-center">
          <NavigationMenuList className="flex gap-x-4">
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link to={item.path}>
                  <NavigationMenuLink
                    className={`font-['Nunito',Helvetica] font-semibold text-xl ${item.active ? "text-[#87ceeb]" : "text-black"} transition-colors duration-300 hover:text-opacity-70`}
                  >
                    {item.text}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Navigation menu for MD screens (up to LG), with 'More' button */}
        <NavigationMenu className="hidden md:flex lg:hidden items-center">
          <NavigationMenuList className="flex gap-x-4">
            {visibleNavItemsOnMd.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link to={item.path}>
                  <NavigationMenuLink
                    className={`font-['Nunito',Helvetica] font-semibold text-xl ${item.active ? "text-[#87ceeb]" : "text-black"} transition-colors duration-300 hover:text-opacity-70`}
                  >
                    {item.text}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
          {hiddenNavItemsOnMd.length > 0 && (
            <div className="relative ml-2">
              <button onClick={() => setShowMoreNav(!showMoreNav)} className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <MenuIcon className="h-5 w-5" />
              </button>
              {showMoreNav && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 py-1">
                  {hiddenNavItemsOnMd.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className={`block px-4 py-2 text-sm font-['Nunito',Helvetica] ${item.active ? "text-[#87ceeb]" : "text-black"} hover:bg-gray-100 transition-colors duration-300 hover:text-opacity-70`}
                      onClick={() => setShowMoreNav(false)}
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </NavigationMenu>

        {/* Contact information */}
        <div className="hidden md:flex flex-col font-['Nunito',Helvetica] font-semibold text-base text-left space-y-1 flex-shrink-0">
          <span className="text-black">Город: <span className="text-[#87ceeb]">Кстово</span></span>
          <span className="text-black">Наш адрес: г. Кстово д. 5 А, оф.42</span>
        </div>
      </div>

      <div className={`block md:hidden bg-white w-full border-t overflow-hidden transition-all duration-700 ease-in-out ${isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="flex flex-col items-center space-y-4 py-4 transition-opacity duration-700 ease-in-out">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`font-['Nunito',Helvetica] font-semibold text-xl ${
                  item.active ? 'text-[#87ceeb]' : 'text-black'
                } transition-colors duration-300 hover:text-opacity-70`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center space-y-1 pb-4 transition-opacity duration-700 ease-in-out">
          <span className="text-black">Город: <span className="text-[#87ceeb]">Кстово</span></span>
          <span className="text-black">Наш адрес: г. Кстово д. 5 А, оф.42</span>
        </div>
      </div>

      {/* Hero banner - only show if showHeroBanner is true */}
      {showHeroBanner && (
        <div className="relative w-full h-[585px] mt-[40px] rounded-xl overflow-hidden">
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
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 text-shadow-lg max-w-3xl text-center opacity-90">Профессиональные строительные и ремонтные услуги</h1>
              <p className="text-base sm:text-lg md:text-xl max-w-2xl text-center opacity-80">Качество, проверенное временем</p>
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
