'use client'

import { Exercise } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { FC } from 'react'

interface ExerciseCardProps {
  exercise: Exercise
  workoutId: string
}

const ExerciseCard: FC<ExerciseCardProps> = ({ exercise, workoutId }) => {
  const { sets, reps } = exercise.session_parameters

  return (
    <Link href={`/dashboard/workouts/${workoutId}/exercises/${exercise.id}`} className='w-full'>
      <Card className='cursor-pointer transition-shadow hover:shadow-lg'>
        <CardHeader>
          <CardTitle>{exercise.title}</CardTitle>
          <CardDescription>{exercise.description}</CardDescription>
        </CardHeader>
        <CardContent className='flex gap-4 text-sm'>
          <div className='bg-primary/10 flex items-center gap-2 rounded px-3 py-1'>
            <span className='text-primary font-medium'>{sets}</span>
            <span className='text-muted-foreground'>сетов</span>
          </div>
          <div className='bg-secondary/10 flex items-center gap-2 rounded px-3 py-1'>
            <span className='text-secondary font-medium'>{reps}</span>
            <span className='text-muted-foreground'>повторений</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ExerciseCard
