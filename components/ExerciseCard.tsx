'use client';

import { Exercise } from '@/types';
import Link from 'next/link';
import { FC } from 'react';

interface ExerciseCardProps {
  exercise: Exercise;
  workoutId: string;
}

const ExerciseCard: FC<ExerciseCardProps> = ({ exercise, workoutId }) => {
  const { sets, reps } = exercise.session_parameters;

  return (
    <Link href={`/dashboard/workouts/${workoutId}/exercises/${exercise.id}`}>
      <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{exercise.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
          </div>

          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded">
              <span className="font-medium text-indigo-700">{sets}</span>
              <span className="text-gray-600">сетов</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded">
              <span className="font-medium text-blue-700">{reps}</span>
              <span className="text-gray-600">повторений</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExerciseCard;
