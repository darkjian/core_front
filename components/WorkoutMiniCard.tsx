import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import type { FC } from 'react'
import { DayOfWeek } from '@/types'
import type { Workout, RussianDayOfWeekName } from '@/types'

interface WorkoutMiniCardProps {
  workout: Workout
  program: string
  isToday?: boolean
}

const dayNameMap: Record<string, DayOfWeek> = {
  monday: DayOfWeek.Monday,
  tuesday: DayOfWeek.Tuesday,
  wednesday: DayOfWeek.Wednesday,
  thursday: DayOfWeek.Thursday,
  friday: DayOfWeek.Friday,
  saturday: DayOfWeek.Saturday,
  sunday: DayOfWeek.Sunday,
}

const russianDaysShort: Record<DayOfWeek, RussianDayOfWeekName> = {
  [DayOfWeek.Sunday]: 'Вс',
  [DayOfWeek.Monday]: 'Пн',
  [DayOfWeek.Tuesday]: 'Вт',
  [DayOfWeek.Wednesday]: 'Ср',
  [DayOfWeek.Thursday]: 'Чт',
  [DayOfWeek.Friday]: 'Пт',
  [DayOfWeek.Saturday]: 'Сб',
}

const WorkoutMiniCard: FC<WorkoutMiniCardProps> = ({ workout, program, isToday = false }) => {
  const dayIndex = dayNameMap[workout.day_of_week.toLowerCase()]
  const weekday = russianDaysShort[dayIndex]

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
