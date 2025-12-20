'use client'
import ExerciseCard from '@/components/ExerciseCard'
import { ExercisesSkeleton } from '@/components/skeletons/ExercisesSkeleton'
import { useGetWorkoutExercises } from '@/hooks/queries/workouts'
import { useParams, useSearchParams } from 'next/navigation'
import { FC } from 'react'

const Workouts: FC = () => {
  const workoutId = useParams()?.id as string
  const workoutTitle = useSearchParams().get('workout_title')
  const { data: exercises = [], error, isLoading } = useGetWorkoutExercises(workoutId)

  if (isLoading) {
    return <ExercisesSkeleton />
  }

  if (error) {
    return (
      <>
        <div className='mb-5 flex flex-col items-center justify-between md:items-start'>
          <span className='text-2xl font-black text-gray-700 md:text-3xl'>Тренировка: {workoutTitle}</span>
        </div>
        <span className='flex justify-center pt-64 text-sm text-red-400'>ошибка подключения к серверу</span>
      </>
    )
  }

  if (exercises.length === 0) {
    return (
      <>
        <div className='mb-5 flex flex-col items-center justify-between md:items-start'>
          <span className='text-2xl font-black text-gray-700 md:text-3xl'>Тренировка: {workoutTitle}</span>
        </div>
        <span className='flex justify-center pt-64 text-sm text-gray-400'>упражнения нет</span>
      </>
    )
  }

  return (
    <>
      <div className='mb-8 flex flex-col items-center md:items-start'>
        <h1 className='text-3xl font-black text-gray-900 md:text-4xl'>{workoutTitle}</h1>
      </div>

      <div className='flex w-full flex-col gap-4 md:items-start'>
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} workoutId={workoutId} />
        ))}
      </div>
    </>
  )
}

export default Workouts
