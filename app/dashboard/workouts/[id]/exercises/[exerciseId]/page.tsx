'use client'

import { WorkoutVideo } from '@/components/workout/WorkoutVideo'
import { WorkoutTimer } from '@/components/workout/WorkoutTimer'
import { WorkoutControls } from '@/components/workout/WorkoutControls'
import { WorkoutSets } from '@/components/workout/WorkoutSets'
import { useWorkoutTimer } from '@/hooks/useWorkoutTimer'
import { useParams } from 'next/navigation'
import { FC } from 'react'
import { Button } from '@/components/ui/button'

const ExerciseDetail: FC = () => {
  const params = useParams()
  const exerciseId = params?.exerciseId as string
  const workoutId = params?.id as string

  // TODO: Создать query hook для получения деталей упражнения
  // const { data: exercise, isLoading, error } = useGetExerciseDetail(exerciseId);

  // Таймер упражнения
  const { seconds, isRunning, start, pause, stop, completeSet, sets, clearSets } = useWorkoutTimer()
  const hasStarted = seconds > 0 || sets.length > 0

  const handleComplete = () => {
    console.log('Упражнение завершено!', {
      exerciseId,
      workoutId,
      sets: sets.map((s) => ({
        setNumber: s.setNumber,
        duration: s.duration,
        timestamp: s.timestamp,
      })),
      totalTime: sets.reduce((sum, s) => sum + s.duration, 0),
    })
  }

  return (
    <>
      {/* Заголовок */}
      <div className='mb-8 flex flex-col items-center md:items-start'>
        <h1 className='text-3xl font-black text-gray-900 md:text-4xl'>Упражнение</h1>
        <p className='mt-2 text-sm text-gray-600'>ID: {exerciseId}</p>
      </div>

      {/* Видео/картинка */}
      <WorkoutVideo title='Упражнение' />

      {/* Таймер */}
      <div className='mb-8 flex justify-center'>
        <WorkoutTimer seconds={seconds} isRunning={isRunning} />
      </div>

      {/* Кнопки управления */}
      <div className='mb-8 flex justify-center'>
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
        <div className='mb-12 rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
          <WorkoutSets sets={sets} onClearSets={clearSets} />
        </div>
      )}

      {/* Кнопка завершить упражнение */}
      {sets.length > 0 && (
        <div className='mb-12 flex justify-center gap-4'>
          <Button
            onClick={handleComplete}
            className='rounded-lg bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700'
          >
            ✓ Завершить упражнение
          </Button>
        </div>
      )}

      {/* Information */}
      <div className='mt-8 rounded-lg bg-white p-8 shadow-md'>
        <div className='flex flex-col gap-6'>
          {/* Exercise Info */}
          <section>
            <h2 className='mb-4 text-2xl font-bold text-gray-900'>Информация об упражнении</h2>
            <div className='rounded-lg border border-gray-200 bg-gray-50 p-6'>
              <p className='text-gray-600'>Здесь будет информация об упражнении. Нужно создать:</p>
              <ul className='mt-3 list-inside list-disc space-y-2 text-gray-600'>
                <li>
                  Query hook: <code className='rounded bg-gray-100 px-2 py-1'>useGetExerciseDetail(id)</code>
                </li>
                <li>
                  Service функция: <code className='rounded bg-gray-100 px-2 py-1'>getExerciseDetail(id)</code>
                </li>
                <li>
                  API endpoint: <code className='rounded bg-gray-100 px-2 py-1'>/api/v1/exercises/:id</code>
                </li>
              </ul>
            </div>
          </section>

          {/* Session Parameters */}
          <section>
            <h2 className='mb-4 text-2xl font-bold text-gray-900'>Параметры сессии</h2>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
              <div className='rounded-lg border border-indigo-200 bg-indigo-50 p-4'>
                <p className='text-sm font-medium text-indigo-600'>Сетов</p>
                <p className='mt-2 text-3xl font-bold text-indigo-900'>-</p>
              </div>
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                <p className='text-sm font-medium text-blue-600'>Повторений</p>
                <p className='mt-2 text-3xl font-bold text-blue-900'>-</p>
              </div>
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className='mb-4 text-2xl font-bold text-gray-900'>Описание</h2>
            <div className='rounded-lg border border-gray-200 bg-gray-50 p-6'>
              <p className='leading-relaxed text-gray-600'>Описание упражнения будет загружено с сервера...</p>
            </div>
          </section>

          {/* Back Button */}
          <div className='mt-8'>
            <Button onClick={() => window.history.back()} variant='outline'>
              ← Назад к упражнениям
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExerciseDetail
