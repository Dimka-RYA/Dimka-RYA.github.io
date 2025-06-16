// Скрипт для исправления путей на GitHub Pages и при локальном просмотре
(function() {
  // Определяем, открыт ли файл локально через file://
  var isLocalFile = window.location.protocol === 'file:';
  
  // Определяем базовый путь для GitHub Pages
  var basePath = isLocalFile ? '.' : window.location.pathname.split('/').slice(0, -1).join('/');
  
  // Функция для исправления пути
  function fixPath(path) {
    // Если путь уже относительный, не меняем его
    if (!path.startsWith('/')) return path;
    
    // Для локальных файлов просто убираем начальный слеш
    if (isLocalFile) return path.substring(1);
    
    // Для веб-сервера добавляем базовый путь
    return basePath + path;
  }
  
  // Находим все скрипты и стили с абсолютными путями
  var scripts = document.querySelectorAll('script[src^="/"]');
  var links = document.querySelectorAll('link[href^="/"]');
  var images = document.querySelectorAll('img[src^="/"]');
  
  // Исправляем пути для скриптов
  scripts.forEach(function(script) {
    var src = script.getAttribute('src');
    script.setAttribute('src', fixPath(src));
  });
  
  // Исправляем пути для стилей
  links.forEach(function(link) {
    var href = link.getAttribute('href');
    link.setAttribute('href', fixPath(href));
  });
  
  // Исправляем пути для изображений
  images.forEach(function(img) {
    var src = img.getAttribute('src');
    img.setAttribute('src', fixPath(src));
  });
})(); 