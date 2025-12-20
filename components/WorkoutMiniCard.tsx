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
      className={`min-w-xs rounded-2xl bg-white p-3 drop-shadow-lg`}
      href={`/dashboard/workouts/${workout.id}?workout_title=${workout.title}`}
    >
      <div className='flex items-center justify-between'>
        <span className='line-clamp-1 text-sm font-bold text-neutral-600'>{workout.title}</span>
        <span className={`text-xs ${isToday ? 'text-indigo-600' : 'text-gray-500'}`}>
          {isToday ? 'сегодня' : `${weekday}`}
        </span>
      </div>
      <span className='line-clamp-1 text-xs text-gray-500'>{program}</span>
    </Link>
  )
}

export default WorkoutMiniCard
