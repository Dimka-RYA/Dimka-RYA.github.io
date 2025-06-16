import { createClient } from '@supabase/supabase-js';

// Инициализация клиента Supabase с переменными окружения
const supabaseUrl = 'https://yplbcnxqfjjlcrxhggxy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwbGJjbnhxZmpqbGNyeGhnZ3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwOTM5NzIsImV4cCI6MjA2NTY2OTk3Mn0.a871ibCHrRZOeN8Zxvm9DnO1jmrMMK6o8mClVBtDVL0';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Проверка существования таблицы submissions
export const initializeDatabase = async () => {
  try {
    // Пытаемся выполнить запрос к таблице submissions
    const { data, error } = await supabase
      .from('submissions')
      .select('count')
      .limit(1);

    // Если получили ошибку 404 или сообщение о несуществующей таблице
    if (error) {
      console.error('Ошибка при проверке таблицы submissions:', error);
      
      // Проверяем различные форматы ошибок, указывающие на отсутствие таблицы
      const isTableNotExist = 
        error.code === '42P01' || // PostgreSQL код для несуществующей таблицы
        error.message.includes('does not exist') ||
        error.message.includes('не существует') ||
        error.message.includes('relation "submissions" does not exist') ||
        error.details?.includes('does not exist') ||
        error.code === '404';
      
      if (isTableNotExist) {
        return { 
          success: false, 
          error: error,
          notExists: true,
          message: 'Таблица submissions не существует в базе данных'
        };
      }
      
      return { success: false, error: error };
    }

    return { success: true };
  } catch (error) {
    console.error('Непредвиденная ошибка при инициализации БД:', error);
    return { 
      success: false, 
      error: error,
      message: 'Непредвиденная ошибка при инициализации базы данных'
    };
  }
};

// Интерфейс для данных формы
interface FormData {
  name: string;
  phone: string;
  email: string;
  message?: string;
  type: string;
  service?: string;
  serviceOption?: string;
  address?: string;
}

// Функция для сохранения данных формы в Supabase
export const saveFormSubmission = async (formData: FormData) => {
  try {
    // Сначала проверяем, существует ли таблица
    const dbStatus = await initializeDatabase();
    if (!dbStatus.success) {
      // Если таблица не существует, возвращаем соответствующую ошибку
      if (dbStatus.notExists) {
        return {
          success: false,
          notExists: true,
          message: 'Таблица submissions не существует в базе данных'
        };
      }
      return {
        success: false,
        error: dbStatus.error,
        message: 'Ошибка при подключении к базе данных'
      };
    }

    // Если таблица существует, сохраняем данные
    const { data, error } = await supabase
      .from('submissions')
      .insert([formData])
      .select();

    if (error) {
      console.error('Ошибка при сохранении данных:', error);
      return { 
        success: false, 
        error: error,
        message: 'Не удалось сохранить данные формы'
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Непредвиденная ошибка при сохранении данных:', error);
    return { 
      success: false, 
      error: error,
      message: 'Непредвиденная ошибка при сохранении данных'
    };
  }
};

// Функция для получения всех заявок из Supabase
export const getFormSubmissions = async () => {
  try {
    // Сначала проверяем, существует ли таблица
    const dbStatus = await initializeDatabase();
    if (!dbStatus.success) {
      // Если таблица не существует, возвращаем соответствующую ошибку
      if (dbStatus.notExists) {
        return {
          success: false,
          notExists: true,
          message: 'Таблица submissions не существует в базе данных'
        };
      }
      return {
        success: false,
        error: dbStatus.error,
        message: 'Ошибка при подключении к базе данных'
      };
    }

    // Если таблица существует, получаем данные
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Ошибка при получении данных:', error);
      return { 
        success: false, 
        error: error,
        message: 'Не удалось загрузить заявки'
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Непредвиденная ошибка при получении данных:', error);
    return { 
      success: false, 
      error: error,
      message: 'Непредвиденная ошибка при загрузке заявок'
    };
  }
};

// Функция для удаления заявки по ID
export const deleteSubmission = async (submissionId: number) => {
  try {
    // Сначала проверяем, существует ли таблица
    const dbStatus = await initializeDatabase();
    if (!dbStatus.success) {
      // Если таблица не существует, возвращаем соответствующую ошибку
      if (dbStatus.notExists) {
        return {
          success: false,
          notExists: true,
          message: 'Таблица submissions не существует в базе данных'
        };
      }
      return {
        success: false,
        error: dbStatus.error,
        message: 'Ошибка при подключении к базе данных'
      };
    }

    // Если таблица существует, удаляем запись
    const { data, error } = await supabase
      .from('submissions')
      .delete()
      .eq('id', submissionId)
      .select();

    if (error) {
      console.error('Ошибка при удалении заявки:', error);
      return { 
        success: false, 
        error: error,
        message: 'Не удалось удалить заявку'
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Непредвиденная ошибка при удалении заявки:', error);
    return { 
      success: false, 
      error: error,
      message: 'Непредвиденная ошибка при удалении заявки'
    };
  }
}; 