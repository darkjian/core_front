'use client'

import { formatTime } from '@/hooks/useWorkoutTimer'
import { FC } from 'react'

interface WorkoutTimerProps {
  seconds: number
  isRunning: boolean
}

/**
 * Компонент отображения таймера с анимированным кругом
 */
export const WorkoutTimer: FC<WorkoutTimerProps> = ({ seconds, isRunning }) => {
  const circumference = 2 * Math.PI * 45 // радиус 45
  const progress = (seconds % 60) / 60 // 0-1
  const offset = circumference - progress * circumference

  return (
    <div className='flex items-center justify-center'>
      <div className='relative h-40 w-40'>
        {/* Фоновый круг */}
        <svg className='absolute inset-0 h-full w-full -rotate-90 transform' viewBox='0 0 100 100'>
          <circle cx='50' cy='50' r='45' fill='none' stroke='hsl(var(--border))' strokeWidth='2' />
          {/* Прогресс круг */}
          <circle
            cx='50'
            cy='50'
            r='45'
            fill='none'
            stroke={isRunning ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
            strokeWidth='2'
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap='round'
            className='transition-all duration-300'
          />
        </svg>

        {/* Текст внутри круга */}
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <div className='text-foreground text-4xl font-bold'>{formatTime(seconds)}</div>
        </div>
      </div>
    </div>
  )
}

export default WorkoutTimer
