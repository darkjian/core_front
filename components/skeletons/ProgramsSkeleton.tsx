'use client'

import { Skeleton } from '@/components/ui/skeleton'

export const ProgramsSkeleton = () => {
  return (
    <div className='space-y-6'>
      {/* Header skeleton */}
      <div className='mb-8 flex flex-col items-center md:items-start'>
        <Skeleton className='mb-2 h-10 w-40' />
      </div>

      {/* Toggle buttons skeleton */}
      <div className='mb-8 flex gap-4'>
        <Skeleton className='h-10 w-24' />
        <Skeleton className='h-10 w-32' />
      </div>

      {/* Programs grid skeleton */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className='border-border bg-card space-y-3 rounded-lg border p-4'>
            {/* Card header */}
            <Skeleton className='h-6 w-3/4' />

            {/* Card content */}
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-5/6' />
            </div>

            {/* Card footer */}
            <Skeleton className='mt-4 h-10 w-full' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgramsSkeleton
