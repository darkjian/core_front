'use client'

import { Skeleton } from '@/components/ui/skeleton'

export const ExercisesSkeleton = () => {
  return (
    <div className='space-y-6'>
      {/* Header skeleton */}
      <div className='mb-8 flex flex-col items-center md:items-start'>
        <Skeleton className='mb-2 h-10 w-48' />
        <Skeleton className='h-5 w-32' />
      </div>

      {/* Exercises list skeleton */}
      <div className='flex w-full flex-col gap-4 md:items-start'>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className='w-full space-y-3 rounded-lg border border-gray-200 bg-white p-4'>
            {/* Exercise title */}
            <Skeleton className='h-6 w-40' />

            {/* Exercise description */}
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
            </div>

            {/* Exercise info (sets/reps) */}
            <div className='flex gap-4'>
              <Skeleton className='h-12 w-20' />
              <Skeleton className='h-12 w-20' />
            </div>

            {/* Action button */}
            <Skeleton className='mt-4 h-10 w-full' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExercisesSkeleton
