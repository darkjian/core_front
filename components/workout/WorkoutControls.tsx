'use client';

import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { Play, Pause, Square, CheckCircle2 } from 'lucide-react';

interface WorkoutControlsProps {
  isRunning: boolean;
  hasStarted: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onComplete: () => void;
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
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {/* Кнопка Начать */}
      {!hasStarted || !isRunning ? (
        <Button
          onClick={onStart}
          size="lg"
          className="rounded-full w-20 h-20 text-white bg-green-600 hover:bg-green-700"
        >
          <Play className="w-8 h-8" />
        </Button>
      ) : null}

      {/* Кнопка Пауза */}
      {isRunning && (
        <Button
          onClick={onPause}
          size="lg"
          className="rounded-full w-20 h-20 text-white bg-yellow-600 hover:bg-yellow-700"
        >
          <Pause className="w-8 h-8" />
        </Button>
      )}

      {/* Кнопка Стоп */}
      {hasStarted && (
        <Button
          onClick={onStop}
          size="lg"
          variant="destructive"
          className="rounded-full w-20 h-20"
        >
          <Square className="w-8 h-8" />
        </Button>
      )}

      {/* Кнопка Завершить подход */}
      {hasStarted && (
        <Button
          onClick={onComplete}
          size="lg"
          className="rounded-full w-20 h-20 text-white bg-blue-600 hover:bg-blue-700"
        >
          <CheckCircle2 className="w-8 h-8" />
        </Button>
      )}
    </div>
  );
};

export default WorkoutControls;
