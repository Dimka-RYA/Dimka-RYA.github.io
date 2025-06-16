import React, { useState } from 'react';

interface DatabaseErrorProps {
  error: any;
}

export const DatabaseError: React.FC<DatabaseErrorProps> = ({ error }) => {
  const [showSql, setShowSql] = useState(false);
  
  // SQL-скрипт для создания таблицы submissions
  const sqlScript = `-- Создание таблицы submissions для хранения заявок
CREATE TABLE submissions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  type TEXT NOT NULL,
  service TEXT,
  serviceOption TEXT,
  address TEXT
);

-- Настройка Row Level Security (RLS) для защиты данных
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Создание политики доступа для чтения (только для аутентифицированных пользователей)
CREATE POLICY "Разрешить чтение для аутентифицированных пользователей" 
ON submissions FOR SELECT 
USING (auth.role() = 'authenticated');

-- Создание политики доступа для вставки (разрешено всем, включая анонимных)
CREATE POLICY "Разрешить вставку для всех пользователей" 
ON submissions FOR INSERT 
WITH CHECK (true);`;

  // Функция для копирования SQL-скрипта в буфер обмена
  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlScript)
      .then(() => {
        alert('SQL-скрипт скопирован в буфер обмена');
      })
      .catch(err => {
        console.error('Не удалось скопировать текст: ', err);
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">Ошибка базы данных</h3>
            <p className="text-red-700 mt-1">{error.message || 'Таблица submissions не существует в базе данных'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Необходимо создать таблицу в базе данных</h2>
        
        <p className="mb-4">
          Для корректной работы форм обратной связи и заказа услуг необходимо создать таблицу <code className="bg-gray-100 px-1 py-0.5 rounded">submissions</code> в вашей базе данных Supabase.
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Инструкция по созданию таблицы:</h3>
          <ol className="list-decimal ml-6 space-y-2">
            <li>Откройте <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">панель управления Supabase</a></li>
            <li>Войдите в свой аккаунт</li>
            <li>Выберите проект с URL <code className="bg-gray-100 px-1 py-0.5 rounded">https://yplbcnxqfjjlcrxhggxy.supabase.co</code></li>
            <li>В левом меню выберите <strong>SQL Editor</strong></li>
            <li>Нажмите <strong>+ New query</strong> для создания нового SQL-запроса</li>
            <li>Вставьте SQL-код из блока ниже</li>
            <li>Нажмите кнопку <strong>Run</strong> для выполнения запроса</li>
            <li>Обновите страницу этого приложения</li>
          </ol>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-700">SQL-код для создания таблицы:</h3>
            <button 
              onClick={() => setShowSql(!showSql)}
              className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              {showSql ? 'Скрыть код' : 'Показать код'}
            </button>
          </div>

          {showSql && (
            <div className="relative">
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm">
                {sqlScript}
              </pre>
              <button 
                onClick={copyToClipboard}
                className="absolute top-2 right-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
              >
                Копировать
              </button>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-800">После создания таблицы</h3>
              <p className="text-blue-700 mt-1">
                После успешного создания таблицы формы на сайте начнут работать корректно, и все заявки будут сохраняться в базе данных. Обновите эту страницу, чтобы увидеть изменения.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 