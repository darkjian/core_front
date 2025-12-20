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
    <Link
      className='border-border bg-card hover:bg-muted min-w-xs rounded-2xl border p-3 drop-shadow-lg transition-colors'
      href={`/dashboard/workouts/${workout.id}?workout_title=${workout.title}`}
    >
      <div className='flex items-center justify-between'>
        <span className='text-foreground line-clamp-1 text-sm font-bold'>{workout.title}</span>
        <span className={`text-xs ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>
          {isToday ? 'сегодня' : `${weekday}`}
        </span>
      </div>
      <span className='text-muted-foreground line-clamp-1 text-xs'>{program}</span>
    </Link>
  )
}

export default WorkoutMiniCard
