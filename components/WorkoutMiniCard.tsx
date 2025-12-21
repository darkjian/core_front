import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import type { FC } from 'react'
import type { Workout } from '@/types'

interface WorkoutMiniCardProps {
  workout: Workout
  program: string
  isToday?: boolean
}

const daysOfWeekMap: Record<string, number> = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 0,
}
const russianDaysShort: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

const WorkoutMiniCard: FC<WorkoutMiniCardProps> = ({ workout, program, isToday = false }) => {
  const dayIndex = daysOfWeekMap[workout.day_of_week.toLowerCase()]
  const weekday = russianDaysShort[dayIndex]

  return (
    <Link href={`/dashboard/workouts/${workout.id}?workout_title=${workout.title}`}>
      <Card className='hover:bg-muted cursor-pointer transition-colors'>
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
