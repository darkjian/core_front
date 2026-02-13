import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import type { FC } from 'react'
import type { Workout } from '@/types'
import { daysOfWeek } from '@/constants/days'

interface WorkoutMiniCardProps {
  workout: Workout
  program: string
  isToday?: boolean
}

const WorkoutMiniCard: FC<WorkoutMiniCardProps> = ({ workout, program, isToday = false }) => {
  const weekday = daysOfWeek[workout.day_of_week.toLowerCase() as keyof typeof daysOfWeek]

  return (
    <Link href={`/dashboard/workouts/${workout.id}?workout_title=${workout.title}`} className='w-full'>
      <Card className='hover:bg-muted cursor-pointer'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='line-clamp-1'>{workout.title}</CardTitle>
            <span className={`text-xs ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>
              {isToday ? 'сегодня' : `${weekday}`}
            </span>
          </div>
          <CardDescription className='line-clamp-1'>{program}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

export default WorkoutMiniCard
