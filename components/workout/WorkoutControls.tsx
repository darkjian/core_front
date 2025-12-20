'use client'

import { Button } from '@/components/ui/button'
import { FC } from 'react'
import { Play, Pause, Square, CheckCircle2 } from 'lucide-react'

interface WorkoutControlsProps {
  isRunning: boolean
  hasStarted: boolean
  onStart: () => void
  onPause: () => void
  onStop: () => void
  onComplete: () => void
}

/**
 * Компонент с кнопками управления тренировкой
 */
export const WorkoutControls: FC<WorkoutControlsProps> = ({
  isRunning,
  hasStarted,
  onStart,
  onPause,
  onStop,
  onComplete,
}) => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      {/* Кнопка Начать */}
      {!hasStarted || !isRunning ? (
        <Button
          onClick={onStart}
          size='lg'
          className='h-20 w-20 rounded-full bg-green-600 text-white hover:bg-green-700'
        >
          <Play className='h-8 w-8' />
        </Button>
      ) : null}

      {/* Кнопка Пауза */}
      {isRunning && (
        <Button
          onClick={onPause}
          size='lg'
          className='h-20 w-20 rounded-full bg-yellow-600 text-white hover:bg-yellow-700'
        >
          <Pause className='h-8 w-8' />
        </Button>
      )}

      {/* Кнопка Стоп */}
      {hasStarted && (
        <Button onClick={onStop} size='lg' variant='destructive' className='h-20 w-20 rounded-full'>
          <Square className='h-8 w-8' />
        </Button>
      )}

      {/* Кнопка Завершить подход */}
      {hasStarted && (
        <Button
          onClick={onComplete}
          size='lg'
          className='h-20 w-20 rounded-full bg-blue-600 text-white hover:bg-blue-700'
        >
          <CheckCircle2 className='h-8 w-8' />
        </Button>
      )}
    </div>
  )
}

export default WorkoutControls
