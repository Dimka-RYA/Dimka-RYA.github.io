// Скрипт для исправления путей на GitHub Pages
(function() {
  // Определяем базовый путь для GitHub Pages
  var basePath = window.location.pathname.split('/').slice(0, -1).join('/');
  
  // Находим все скрипты и стили с абсолютными путями
  var scripts = document.querySelectorAll('script[src^="/"]');
  var links = document.querySelectorAll('link[href^="/"]');
  var images = document.querySelectorAll('img[src^="/"]');
  
  // Исправляем пути для скриптов
  scripts.forEach(function(script) {
    var src = script.getAttribute('src');
    script.setAttribute('src', basePath + src);
  });
  
  // Исправляем пути для стилей
  links.forEach(function(link) {
    var href = link.getAttribute('href');
    link.setAttribute('href', basePath + href);
  });
  
  // Исправляем пути для изображений
  images.forEach(function(img) {
    var src = img.getAttribute('src');
    img.setAttribute('src', basePath + src);
  });
})(); 