import React, { useState, useEffect } from "react";
import { getFormSubmissions, initializeDatabase, deleteSubmission } from "../../lib/supabase";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { DatabaseError } from "../../components/DatabaseError";
import { Trash2, AlertCircle, Check } from "lucide-react";

// Типы для заявок
interface Submission {
  id: number;
  name: string;
  phone: string;
  email: string;
  message?: string;
  type: string;
  service?: string;
  serviceOption?: string;
  address?: string;
  created_at: string;
}

export const AdminSubmissions: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dbError, setDbError] = useState<any | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [deleteConfirmation, setDeleteConfirmation] = useState<{show: boolean, id: number | null}>({show: false, id: null});
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<{show: boolean, message: string}>({show: false, message: ''});

  // Загрузка заявок при монтировании компонента
  useEffect(() => {
    checkDatabaseAndFetchSubmissions();
  }, []);

  // Проверка базы данных и загрузка заявок
  const checkDatabaseAndFetchSubmissions = async () => {
    setLoading(true);
    try {
      // Сначала проверяем, существует ли таблица
      const dbResult = await initializeDatabase();
      
      if (!dbResult.success) {
        console.error("Ошибка инициализации БД:", dbResult.error);
        if (dbResult.notExists) {
          setDbError({
            message: 'Таблица submissions не существует в базе данных. Необходимо создать таблицу согласно инструкции.'
          });
          setLoading(false);
          return;
        }
        setError("Ошибка при подключении к базе данных. Пожалуйста, попробуйте позже.");
        setLoading(false);
        return;
      }
      
      // Если таблица существует, загружаем заявки
      await fetchSubmissions();
    } catch (err) {
      console.error("Ошибка при инициализации:", err);
      setError("Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.");
      setLoading(false);
    }
  };

  // Функция для загрузки заявок из Supabase
  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const result = await getFormSubmissions();
      
      if (result.success && result.data) {
        setSubmissions(result.data);
      } else if (result.notExists) {
        // Если таблица не существует, показываем инструкцию по созданию
        setDbError({
          message: 'Таблица submissions не существует в базе данных. Необходимо создать таблицу согласно инструкции.'
        });
      } else {
        throw new Error("Не удалось загрузить заявки");
      }
    } catch (err) {
      console.error("Ошибка при загрузке заявок:", err);
      setError("Не удалось загрузить заявки. Пожалуйста, попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  // Форматирование даты
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "d MMMM yyyy, HH:mm", { locale: ru });
    } catch {
      return "Неизвестная дата";
    }
  };

  // Отфильтрованные заявки
  const filteredSubmissions = submissions.filter(sub => {
    if (filter === "all") return true;
    return sub.type === filter;
  });

  // Обработчик для детального просмотра
  const handleViewDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setSelectedSubmission(null);
  };

  // Функция для удаления заявки
  const handleDeleteSubmission = async (id: number) => {
    setDeleting(true);
    try {
      const result = await deleteSubmission(id);
      
      if (result.success) {
        // Удаляем заявку из локального состояния
        setSubmissions(prev => prev.filter(sub => sub.id !== id));
        
        // Закрываем модальное окно с деталями, если оно открыто
        if (selectedSubmission && selectedSubmission.id === id) {
          setSelectedSubmission(null);
        }
        
        // Показываем уведомление об успешном удалении
        setDeleteSuccess({
          show: true,
          message: 'Заявка успешно удалена'
        });
        
        // Скрываем уведомление через 3 секунды
        setTimeout(() => {
          setDeleteSuccess({show: false, message: ''});
        }, 3000);
      } else {
        throw new Error(result.message || 'Не удалось удалить заявку');
      }
    } catch (err: any) {
      console.error("Ошибка при удалении заявки:", err);
      setError(`Не удалось удалить заявку: ${err.message || 'Неизвестная ошибка'}`);
      
      // Скрываем ошибку через 3 секунды
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setDeleting(false);
      // Закрываем модальное окно подтверждения
      setDeleteConfirmation({show: false, id: null});
    }
  };

  // Открыть модальное окно подтверждения удаления
  const confirmDelete = (id: number) => {
    setDeleteConfirmation({show: true, id});
  };

  // Закрыть модальное окно подтверждения удаления
  const cancelDelete = () => {
    setDeleteConfirmation({show: false, id: null});
  };

  // Если есть ошибка базы данных, показываем компонент с инструкциями
  if (dbError) {
    return <DatabaseError error={dbError} />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#87ceeb]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6 flex items-center space-x-2">
        <AlertCircle size={20} className="text-red-600" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Уведомление об успешном удалении */}
      {deleteSuccess.show && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 shadow-md flex items-center space-x-2 z-50">
          <Check size={20} className="text-green-600" />
          <p>{deleteSuccess.message}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Заявки от клиентов</h2>
        <div className="flex gap-2">
          <select 
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ceeb]"
          >
            <option value="all">Все заявки</option>
            <option value="contact">Обратная связь</option>
            <option value="service">Заказ услуг</option>
          </select>
          <button 
            onClick={fetchSubmissions}
            className="px-4 py-2 bg-[#87ceeb] hover:bg-[#5fb4d8] text-white rounded-md transition-colors"
          >
            Обновить
          </button>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-6 text-center">
          <p className="text-lg">Нет заявок для отображения</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Имя</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Телефон</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тип</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {formatDate(submission.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {submission.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {submission.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {submission.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      submission.type === 'contact' 
                        ? 'bg-blue-100 text-blue-800' 
                        : submission.type === 'service'
                          ? 'bg-green-100 text-green-800'
                          : submission.type === 'quick'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {submission.type === 'contact' 
                        ? 'Обратная связь' 
                        : submission.type === 'service'
                          ? 'Заказ услуги'
                          : submission.type === 'quick'
                            ? 'Быстрая заявка'
                            : 'Консультация'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex space-x-4">
                    <button 
                      onClick={() => handleViewDetails(submission)}
                      className="text-[#87ceeb] hover:text-[#5fb4d8] font-medium transition-colors"
                    >
                      Подробнее
                    </button>
                    <button 
                      onClick={() => confirmDelete(submission.id)}
                      className="text-red-500 hover:text-red-700 font-medium transition-colors flex items-center"
                    >
                      <Trash2 size={16} className="mr-1" /> Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Модальное окно с деталями заявки */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                Детали заявки {
                  selectedSubmission.type === 'contact' 
                    ? 'на обратную связь' 
                    : selectedSubmission.type === 'service'
                      ? 'на услугу'
                      : selectedSubmission.type === 'quick'
                        ? '(быстрая заявка)'
                        : 'на консультацию'
                }
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Дата создания</p>
                  <p className="text-gray-800">{formatDate(selectedSubmission.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Тип заявки</p>
                  <p className="text-gray-800">
                    {selectedSubmission.type === 'contact' ? 'Обратная связь' : 'Заказ услуги'}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-800 mb-2">Информация о клиенте</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Имя</p>
                    <p className="text-gray-800">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Телефон</p>
                    <p className="text-gray-800">{selectedSubmission.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-800">{selectedSubmission.email || "Не указан"}</p>
                  </div>
                  {selectedSubmission.address && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Адрес</p>
                      <p className="text-gray-800">{selectedSubmission.address}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedSubmission.type === 'service' && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-800 mb-2">Информация о заказе</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Услуга</p>
                      <p className="text-gray-800">{selectedSubmission.service}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Вариант услуги</p>
                      <p className="text-gray-800">
                        {selectedSubmission.serviceOption === 'standard' && 'Стандартный пакет'}
                        {selectedSubmission.serviceOption === 'premium' && 'Премиум пакет'}
                        {selectedSubmission.serviceOption === 'custom' && 'Индивидуальный заказ'}
                        {!selectedSubmission.serviceOption && 'Не указан'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedSubmission.message && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-800 mb-2">Сообщение</h4>
                  <p className="text-gray-800 whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
              >
                Закрыть
              </button>
              <button 
                onClick={() => confirmDelete(selectedSubmission.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors flex items-center"
              >
                <Trash2 size={16} className="mr-2" /> Удалить заявку
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно подтверждения удаления */}
      {deleteConfirmation.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertCircle size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Подтверждение удаления</h3>
              <p className="text-sm text-gray-500 mb-6">
                Вы уверены, что хотите удалить эту заявку? Это действие нельзя отменить.
              </p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
                  disabled={deleting}
                >
                  Отмена
                </button>
                <button 
                  onClick={() => deleteConfirmation.id !== null && handleDeleteSubmission(deleteConfirmation.id)}
                  className={`px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors flex items-center justify-center ${deleting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2"></div>
                      Удаление...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} className="mr-2" /> Удалить
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 