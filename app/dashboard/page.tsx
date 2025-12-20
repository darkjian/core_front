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
        <div className='mb-5 flex flex-col items-center justify-between md:items-start'>
          <span className='text-2xl font-black text-gray-700 md:text-3xl'>Тренировки</span>
        </div>
        <span className='flex justify-center pt-64 text-sm text-red-400'>ошибка подключения к серверу</span>
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
        <div className='mb-5 flex flex-col items-center justify-between md:items-start'>
          <span className='text-2xl font-black text-gray-700 md:text-3xl'>Тренировки</span>
        </div>
        <span className='flex justify-center pt-64 text-sm text-gray-400'>тренировок нет</span>
      </>
    )
  }

  return (
    <>
      <div className='mb-5 flex flex-col items-center justify-between md:items-start'>
        <span className='text-2xl font-black text-gray-700 md:text-3xl'>Тренировки</span>
      </div>
      <div className='mb-5 flex flex-col gap-3 md:items-start'>
        {allWorkouts
          .filter((workout) => workout.day_of_week === currenWeekday)
          .map((workout) => (
            <WorkoutMiniCard key={workout.id} workout={workout} program={workout.program_name} />
          ))}
      </div>
      <div className='mb-5 flex flex-col items-center justify-between md:items-start'>
        <span className='text-sm text-gray-400 md:text-lg'>Предстоящие тренировки</span>
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
