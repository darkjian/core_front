'use client'

import { WorkoutSet, formatTime } from '@/hooks/useWorkoutTimer'
import { Card } from '@/components/ui/card'
import { FC } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface WorkoutSetsProps {
  sets: WorkoutSet[]
  onClearSets?: () => void
}

/**
 * Компонент отображения истории подходов
 */
export const WorkoutSets: FC<WorkoutSetsProps> = ({ sets, onClearSets }) => {
  if (sets.length === 0) {
    return null
  }

  // Общее время
  const totalTime = sets.reduce((sum, set) => sum + set.duration, 0)

  return (
    <div className='w-full'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-xl font-bold text-gray-900'>История подходов</h3>
        {sets.length > 0 && onClearSets && (
          <Button
            onClick={onClearSets}
            variant='outline'
            size='sm'
            className='text-red-600 hover:bg-red-50 hover:text-red-700'
          >
            <Trash2 className='mr-2 h-4 w-4' />
            Очистить
          </Button>
        )}
      </div>

      <div className='space-y-3'>
        {sets.map((set, index) => (
          <Card key={index} className='border border-gray-200 p-4 transition-shadow hover:shadow-md'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-1 items-center gap-4'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100'>
                  <span className='text-sm font-bold text-indigo-700'>{set.setNumber}</span>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Подход</p>
                  <p className='text-lg font-semibold text-gray-900'>{formatTime(set.duration)}</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='text-xs text-gray-500'>
                  {set.timestamp.toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </Card>
        ))}

        {/* Итого */}
        <div className='mt-6 border-t border-gray-200 pt-4'>
          <div className='flex items-center justify-between'>
            <span className='font-medium text-gray-600'>Общее время:</span>
            <span className='text-2xl font-bold text-gray-900'>{formatTime(totalTime)}</span>
          </div>
          <div className='mt-2 flex items-center justify-between'>
            <span className='font-medium text-gray-600'>Подходов:</span>
            <span className='text-2xl font-bold text-indigo-600'>{sets.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkoutSets
