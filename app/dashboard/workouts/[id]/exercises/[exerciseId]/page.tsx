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
      <h1 className='text-foreground mb-8 text-center text-3xl font-black md:text-left md:text-4xl'>Упражнение</h1>

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
        <div className='border-border bg-card mb-12 rounded-lg border p-6 shadow-sm'>
          <WorkoutSets sets={sets} onClearSets={clearSets} />
        </div>
      )}

      {/* Кнопка завершить упражнение */}
      {sets.length > 0 && (
        <div className='mb-12 flex justify-center gap-4'>
          <Button onClick={handleComplete} className='rounded-lg px-8 py-3 font-semibold'>
            ✓ Завершить упражнение
          </Button>
        </div>
      )}

      {/* Information */}
      <div className='border-border bg-card mt-8 rounded-lg border p-8 shadow-md'>
        <div className='flex flex-col gap-6'>
          {/* Exercise Info */}
          <section>
            <h2 className='text-foreground mb-4 text-2xl font-black'>Информация об упражнении</h2>
            <div className='border-border bg-muted rounded-lg border p-6'>
              <p className='text-muted-foreground'>Здесь будет информация об упражнении. Нужно создать:</p>
              <ul className='text-muted-foreground mt-3 list-inside list-disc space-y-2'>
                <li>
                  Query hook: <code className='bg-background rounded px-2 py-1'>useGetExerciseDetail(id)</code>
                </li>
                <li>
                  Service функция: <code className='bg-background rounded px-2 py-1'>getExerciseDetail(id)</code>
                </li>
                <li>
                  API endpoint: <code className='bg-background rounded px-2 py-1'>/api/v1/exercises/:id</code>
                </li>
              </ul>
            </div>
          </section>

          {/* Session Parameters */}
          <section>
            <h2 className='text-foreground mb-4 text-2xl font-black'>Параметры сессии</h2>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
              <div className='border-primary/30 bg-primary/10 rounded-lg border p-4'>
                <p className='text-primary text-sm font-medium'>Сетов</p>
                <p className='text-primary mt-2 text-3xl font-bold'>-</p>
              </div>
              <div className='border-secondary/30 bg-secondary/10 rounded-lg border p-4'>
                <p className='text-secondary text-sm font-medium'>Повторений</p>
                <p className='text-secondary mt-2 text-3xl font-bold'>-</p>
              </div>
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className='text-foreground mb-4 text-2xl font-black'>Описание</h2>
            <div className='border-border bg-muted rounded-lg border p-6'>
              <p className='text-muted-foreground leading-relaxed'>Описание упражнения будет загружено с сервера...</p>
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
