'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';

const ExerciseDetail: FC = () => {
  const params = useParams();
  const exerciseId = params?.exerciseId as string;
  const workoutId = params?.id as string;

  // TODO: Создать query hook для получения деталей упражнения
  // const { data: exercise, isLoading, error } = useGetExerciseDetail(exerciseId);

  return (
    <>
      <div className="flex flex-col items-center md:items-start mb-8">
        <h1 className="text-3xl md:text-4xl text-gray-900 font-black">
          Детали упражнения
        </h1>
        <p className="text-gray-600 mt-2">
          Workout ID: {workoutId} | Exercise ID: {exerciseId}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col gap-6">
          {/* Exercise Info */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Информация об упражнении
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-600">
                Здесь будет информация об упражнении. Нужно создать:
              </p>
              <ul className="list-disc list-inside mt-3 text-gray-600 space-y-2">
                <li>Query hook: <code className="bg-gray-100 px-2 py-1 rounded">useGetExerciseDetail(id)</code></li>
                <li>Service функция: <code className="bg-gray-100 px-2 py-1 rounded">getExerciseDetail(id)</code></li>
                <li>API endpoint: <code className="bg-gray-100 px-2 py-1 rounded">/api/v1/exercises/:id</code></li>
              </ul>
            </div>
          </section>

          {/* Session Parameters */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Параметры сессии
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <p className="text-indigo-600 text-sm font-medium">Сетов</p>
                <p className="text-3xl font-bold text-indigo-900 mt-2">-</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-blue-600 text-sm font-medium">Повторений</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">-</p>
              </div>
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Описание
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-600 leading-relaxed">
                Описание упражнения будет загружено с сервера...
              </p>
            </div>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Советы выполнения
            </h2>
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <p className="text-yellow-800">
                Эта секция также загружается с API
              </p>
            </div>
          </section>

          {/* Back Button */}
          <div className="mt-8">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition"
            >
              ← Назад к тренировке
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExerciseDetail;
