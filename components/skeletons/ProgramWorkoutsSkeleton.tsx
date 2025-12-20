'use client'

import { Skeleton } from '@/components/ui/skeleton'

export const ProgramWorkoutsSkeleton = () => {
  return (
    <div className='space-y-6'>
      {/* Header skeleton */}
      <div className='mb-8 flex flex-col items-center md:items-start'>
        <Skeleton className='mb-2 h-10 w-56' />
      </div>

      {/* Workouts list skeleton */}
      <div className='space-y-4'>
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className='border-border bg-card space-y-3 rounded-lg border p-4'>
            {/* Workout title */}
            <Skeleton className='h-6 w-48' />

            {/* Workout info */}
            <div className='flex gap-4'>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-5 w-16' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-5 w-24' />
              </div>
            </div>

            {/* Action button */}
            <Skeleton className='h-10 w-full' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgramWorkoutsSkeleton
