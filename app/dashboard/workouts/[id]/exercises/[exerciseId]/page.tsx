'use client';

import { WorkoutVideo } from "@/components/workout/WorkoutVideo";
import { WorkoutTimer } from "@/components/workout/WorkoutTimer";
import { WorkoutControls } from "@/components/workout/WorkoutControls";
import { WorkoutSets } from "@/components/workout/WorkoutSets";
import { useWorkoutTimer } from "@/hooks/useWorkoutTimer";
import { useParams } from "next/navigation";
import { FC } from "react";
import { Button } from "@/components/ui/button";

const ExerciseDetail: FC = () => {
  const params = useParams();
  const exerciseId = params?.exerciseId as string;
  const workoutId = params?.id as string;

  // TODO: Создать query hook для получения деталей упражнения
  // const { data: exercise, isLoading, error } = useGetExerciseDetail(exerciseId);

  // Таймер упражнения
  const { seconds, isRunning, start, pause, stop, completeSet, sets, clearSets } = useWorkoutTimer();
  const hasStarted = seconds > 0 || sets.length > 0;

  const handleComplete = () => {
    console.log('Упражнение завершено!', {
      exerciseId,
      workoutId,
      sets: sets.map(s => ({
        setNumber: s.setNumber,
        duration: s.duration,
        timestamp: s.timestamp
      })),
      totalTime: sets.reduce((sum, s) => sum + s.duration, 0)
    });
  };

  return (
    <>
      {/* Заголовок */}
      <div className="flex flex-col items-center md:items-start mb-8">
        <h1 className="text-3xl md:text-4xl text-gray-900 font-black">
          Упражнение
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          ID: {exerciseId}
        </p>
      </div>

      {/* Видео/картинка */}
      <WorkoutVideo title="Упражнение" />

      {/* Таймер */}
      <div className="flex justify-center mb-8">
        <WorkoutTimer seconds={seconds} isRunning={isRunning} />
      </div>

      {/* Кнопки управления */}
      <div className="flex justify-center mb-8">
        <WorkoutControls
          isRunning={isRunning}
          hasStarted={hasStarted}
          onStart={start}
          onPause={pause}
          onStop={stop}
          onComplete={completeSet}
        />
      </div>

      {/* История подходов */}
      {sets.length > 0 && (
        <div className="mb-12 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <WorkoutSets sets={sets} onClearSets={clearSets} />
        </div>
      )}

      {/* Кнопка завершить упражнение */}
      {sets.length > 0 && (
        <div className="flex justify-center mb-12 gap-4">
          <Button
            onClick={handleComplete}
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
          >
            ✓ Завершить упражнение
          </Button>
        </div>
      )}

      {/* Information */}
      <div className="bg-white rounded-lg shadow-md p-8 mt-8">
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

          {/* Back Button */}
          <div className="mt-8">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
            >
              ← Назад к упражнениям
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExerciseDetail;
