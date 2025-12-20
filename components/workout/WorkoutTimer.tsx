'use client';

import { formatTime } from '@/hooks/useWorkoutTimer';
import { FC } from 'react';

interface WorkoutTimerProps {
  seconds: number;
  isRunning: boolean;
}

/**
 * Компонент отображения таймера с анимированным кругом
 */
export const WorkoutTimer: FC<WorkoutTimerProps> = ({ seconds, isRunning }) => {
  const circumference = 2 * Math.PI * 45; // радиус 45
  const progress = (seconds % 60) / 60; // 0-1
  const offset = circumference - progress * circumference;

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-40 h-40">
        {/* Фоновый круг */}
        <svg
          className="absolute inset-0 w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          {/* Прогресс круг */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={isRunning ? '#4f46e5' : '#6b7280'}
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>

        {/* Текст внутри круга */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-gray-900">
            {formatTime(seconds)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTimer;
