'use client'

import { Exercise } from '@/types'
import Link from 'next/link'
import { FC } from 'react'

interface ExerciseCardProps {
  exercise: Exercise
  workoutId: string
}

const ExerciseCard: FC<ExerciseCardProps> = ({ exercise, workoutId }) => {
  const { sets, reps } = exercise.session_parameters

  return (
    <Link href={`/dashboard/workouts/${workoutId}/exercises/${exercise.id}`}>
      <div className='border-border bg-card cursor-pointer rounded-lg border p-5 shadow-md transition-shadow hover:shadow-lg'>
        <div className='flex flex-col gap-3'>
          <div>
            <h3 className='text-foreground text-lg font-semibold'>{exercise.title}</h3>
            <p className='text-muted-foreground mt-1 text-sm'>{exercise.description}</p>
          </div>

          <div className='flex gap-4 text-sm'>
            <div className='bg-primary/10 flex items-center gap-2 rounded px-3 py-1'>
              <span className='text-primary font-medium'>{sets}</span>
              <span className='text-muted-foreground'>сетов</span>
            </div>
            <div className='bg-secondary/10 flex items-center gap-2 rounded px-3 py-1'>
              <span className='text-secondary font-medium'>{reps}</span>
              <span className='text-muted-foreground'>повторений</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ExerciseCard
