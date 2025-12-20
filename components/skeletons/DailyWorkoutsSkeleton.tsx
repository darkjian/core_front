'use client'

import { Skeleton } from '@/components/ui/skeleton'

export const DailyWorkoutsSkeleton = () => {
  return (
    <div className='space-y-6'>
      {/* Header skeleton */}
      <div className='mb-8 flex flex-col items-center md:items-start'>
        <Skeleton className='mb-2 h-10 w-48' />
        <Skeleton className='h-5 w-64' />
      </div>

      {/* Programs skeleton */}
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className='border-border bg-card rounded-lg border p-6 shadow-sm'>
          {/* Program title */}
          <Skeleton className='mb-4 h-6 w-40' />

          {/* Workouts list */}
          <div className='space-y-3'>
            {Array.from({ length: 2 }).map((_, workIdx) => (
              <div key={workIdx} className='bg-muted flex items-center justify-between rounded-lg p-4'>
                <div className='flex-1'>
                  <Skeleton className='mb-2 h-5 w-32' />
                  <Skeleton className='h-4 w-24' />
                </div>
                <Skeleton className='h-8 w-20' />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DailyWorkoutsSkeleton
