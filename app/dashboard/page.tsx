'use client'
import WorkoutMiniCard from '@/components/WorkoutMiniCard'
import { DailyWorkoutsSkeleton } from '@/components/skeletons/DailyWorkoutsSkeleton'
import { useGetDailyWorkouts } from '@/hooks/queries/workouts'
import { FC } from 'react'

function getCurrentDayOfWeek(): string {
  const date = new Date()
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' }
  const dayName = date.toLocaleDateString('en-US', options)
  return dayName.toLowerCase()
}

const dayOfWeekOrder: Record<string, number> = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
}

const DashboardHome: FC = () => {
  const { data: response, error, isLoading } = useGetDailyWorkouts()
  const currenWeekday = getCurrentDayOfWeek()

  if (isLoading) {
    return <DailyWorkoutsSkeleton />
  }

  if (error) {
    return (
      <>
        <h1 className='text-foreground mb-8 text-center text-3xl font-black md:text-left md:text-4xl'>Тренировки</h1>
        <span className='text-destructive flex justify-center pt-64 text-sm'>ошибка подключения к серверу</span>
      </>
    )
  }

  const allWorkouts =
    response?.data?.flatMap((program) =>
      program.workouts.map((workout) => ({
        ...workout,
        program_name: program.program_name,
      })),
    ) || []

  if (allWorkouts.length === 0) {
    return (
      <>
        <h1 className='text-foreground mb-8 text-center text-3xl font-black md:text-left md:text-4xl'>Тренировки</h1>
        <span className='text-muted-foreground flex justify-center pt-64 text-sm'>тренировок нет</span>
      </>
    )
  }

  return (
    <>
      <h1 className='text-foreground mb-8 text-center text-3xl font-black md:text-left md:text-4xl'>Тренировки</h1>
      <div className='mb-5 flex flex-col gap-3 md:items-start'>
        {allWorkouts
          .filter((workout) => workout.day_of_week === currenWeekday)
          .map((workout) => (
            <WorkoutMiniCard key={workout.id} workout={workout} program={workout.program_name} />
          ))}
      </div>
      <div className='mb-5 flex flex-col items-center justify-between md:items-start'>
        <span className='text-muted-foreground text-sm md:text-lg'>Предстоящие тренировки</span>
      </div>
      <div className='mb-5 flex flex-col gap-3 md:items-start'>
        {allWorkouts
          .filter((workout) => workout.day_of_week !== currenWeekday)
          .sort((a, b) => {
            const dayA = a.day_of_week.toLowerCase()
            const dayB = b.day_of_week.toLowerCase()
            return dayOfWeekOrder[dayA] - dayOfWeekOrder[dayB]
          })
          .map((workout) => (
            <WorkoutMiniCard
              key={workout.id}
              workout={workout}
              program={workout.program_name}
              isToday={workout.day_of_week === currenWeekday}
            />
          ))}
      </div>
    </>
  )
}

export default DashboardHome
