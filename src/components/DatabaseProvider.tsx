import React, { useState, useEffect } from 'react';
import { initializeDatabase } from '../lib/supabase';
import { DatabaseError } from './DatabaseError';

interface DatabaseProviderProps {
  children: React.ReactNode;
}

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({ children }) => {
  const [dbState, setDbState] = useState<{
    initialized: boolean;
    error: any | null;
  }>({
    initialized: false,
    error: null
  });

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        const result = await initializeDatabase();
        setDbState({
          initialized: result.success,
          error: result.success ? null : result.error
        });
      } catch (error) {
        setDbState({
          initialized: false,
          error
        });
      }
    };

    checkDatabase();
  }, []);

  // Если база данных не инициализирована и есть ошибка, показываем компонент с ошибкой
  if (!dbState.initialized && dbState.error) {
    return <DatabaseError error={dbState.error} />;
  }

  // В противном случае рендерим дочерние компоненты
  return <>{children}</>;
}; 