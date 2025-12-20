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
        <h3 className='text-foreground text-xl font-bold'>История подходов</h3>
        {sets.length > 0 && onClearSets && (
          <Button
            onClick={onClearSets}
            variant='outline'
            size='sm'
            className='text-destructive hover:bg-destructive/10 hover:text-destructive'
          >
            <Trash2 className='mr-2 h-4 w-4' />
            Очистить
          </Button>
        )}
      </div>

      <div className='space-y-3'>
        {sets.map((set, index) => (
          <Card key={index} className='border-border border p-4 transition-shadow hover:shadow-md'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-1 items-center gap-4'>
                <div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full'>
                  <span className='text-primary text-sm font-bold'>{set.setNumber}</span>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm'>Подход</p>
                  <p className='text-foreground text-lg font-semibold'>{formatTime(set.duration)}</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='text-muted-foreground text-xs'>
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
        <div className='border-border mt-6 border-t pt-4'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground font-medium'>Общее время:</span>
            <span className='text-foreground text-2xl font-bold'>{formatTime(totalTime)}</span>
          </div>
          <div className='mt-2 flex items-center justify-between'>
            <span className='text-muted-foreground font-medium'>Подходов:</span>
            <span className='text-primary text-2xl font-bold'>{sets.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkoutSets
