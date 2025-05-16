import React from "react";
import { Link } from "react-router-dom";
import { MapPinIcon, MailIcon, PhoneIcon, ClockIcon, Facebook, Twitter, Instagram } from "lucide-react";

export const FooterByAnima = (): JSX.Element => {
  // Company navigation links
  const companyLinks = [
    { title: "Главная", href: "/" },
    { title: "Услуги", href: "/services" },
    { title: "О компании", href: "/about" },
    { title: "Контакты", href: "/contacts" },
  ];

  // Services links
  const serviceLinks = [
    { title: "Установка пластиковых окон", href: "/services#windows" },
    { title: "Ремонт и отделка", href: "/services#repair" },
    { title: "Монтаж кондиционеров", href: "/services#conditioning" },
    { title: "Электромонтажные работы", href: "/services#electrical" },
  ];

  // Contact information
  const contactInfo = [
    {
      value: "+7 (831) 216-61-49",
      label: "Позвонить нам",
      icon: <PhoneIcon className="w-4 h-4 text-[#87ceeb]" />,
      href: "tel:+78312166149",
    },
    {
      value: "info@ipmaslyakov.ru",
      label: "Написать нам",
      icon: <MailIcon className="w-4 h-4 text-[#87ceeb]" />,
      href: "mailto:info@ipmaslyakov.ru",
    },
    {
      value: "Нижегородская область г. Кстово д. 5 А, оф.42",
      label: "Адрес",
      icon: <MapPinIcon className="w-4 h-4 text-[#87ceeb]" />,
      href: "https://maps.google.com/?q=Кстово,5А",
    },
    {
      value: "Пн-Пт, 9:00 - 18:00",
      label: "График работы",
      icon: <ClockIcon className="w-4 h-4 text-[#87ceeb]" />,
      href: null,
    },
  ];

  // Social media links
  const socialLinks = [
    { icon: <Facebook className="w-4 h-4" />, name: "Facebook", href: "https://facebook.com" },
    { icon: <Twitter className="w-4 h-4" />, name: "Twitter", href: "https://twitter.com" },
    { icon: <Instagram className="w-4 h-4" />, name: "Instagram", href: "https://instagram.com" },
  ];

  return (
    <footer className="w-full bg-neutral-800 py-3">
      <div className="container mx-auto px-3">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          {/* Company section */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase font-['Nunito',Helvetica] mb-2">
              О КОМПАНИИ
            </h3>
            <nav>
              <ul className="space-y-1">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="font-normal text-white text-xs font-['Nunito',Helvetica] hover:text-[#87ceeb] transition-colors duration-300 hover:opacity-70"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Services section */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase font-['Nunito',Helvetica] mb-2">
              НАШИ УСЛУГИ
            </h3>
            <nav>
              <ul className="space-y-1">
                {serviceLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="font-normal text-white text-xs font-['Nunito',Helvetica] hover:text-[#87ceeb] transition-colors duration-300 hover:opacity-70"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact information section */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase font-['Nunito',Helvetica] mb-2">
              КОНТАКТНАЯ ИНФОРМАЦИЯ
            </h3>
            <div className="space-y-1">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-1.5 mt-0.5">{item.icon}</div>
                  <div>
                    {item.href ? (
                      <a href={item.href} className="font-medium text-white text-xs font-['Nunito',Helvetica] hover:text-[#87ceeb] transition-colors duration-300 hover:opacity-70">
                        {item.value}
                      </a>
                    ) : (
                      <div className="font-medium text-white text-xs font-['Nunito',Helvetica]">
                        {item.value}
                      </div>
                    )}
                    <div className="font-normal text-[#87ceeb] text-[10px] font-['Nunito',Helvetica]">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social media and copyright */}
        <div className="border-t border-neutral-700 pt-2 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-2 mb-2 md:mb-0">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center text-white hover:bg-[#87ceeb] transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div className="font-normal text-neutral-400 text-[10px] font-['Nunito',Helvetica]">
            © 2023 ИП Масляков. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
};
