-- Создание таблицы для заявок
CREATE TABLE IF NOT EXISTS submissions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  type TEXT NOT NULL,
  service TEXT,
  serviceOption TEXT,
  address TEXT
);

-- Добавление политик доступа для анонимных пользователей (чтобы форма работала без авторизации)
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Разрешаем анонимным пользователям добавлять записи
CREATE POLICY insert_policy ON submissions FOR INSERT TO anon WITH CHECK (true);

-- Разрешаем авторизованным пользователям читать все записи
CREATE POLICY select_policy ON submissions FOR SELECT TO anon USING (true); 