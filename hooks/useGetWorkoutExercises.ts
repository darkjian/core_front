'use client';

import { useState, useEffect } from 'react';
import { listWorkoutExercises } from '@/services/workouts';
import type { Exercise } from '@/types';

export interface UseGetWorkoutExercisesState {
  data: Exercise[];
  loading: boolean;
  error: string | null;
}


export function useGetWorkoutExercises(workoutId: string): UseGetWorkoutExercisesState {
  const [state, setState] = useState<UseGetWorkoutExercisesState>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!workoutId) {
      setState({ data: [], loading: false, error: null });
      return;
    }

    let isMounted = true;

    const loadData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const result = await listWorkoutExercises(workoutId);

        if (isMounted) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Ошибка загрузки упражнений';
          setState({ data: [], loading: false, error: message });
          console.error('useGetWorkoutExercises error:', err);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [workoutId]);

  return state;
}