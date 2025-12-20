'use client';

import { useState, useEffect } from 'react';
import { listProgramWorkouts } from '@/services/workouts';
import type { ProgramWorkoutsResponse } from '@/types';

export interface UseGetProgramWorkoutsState {
  data: ProgramWorkoutsResponse | null;
  loading: boolean;
  error: string | null;
}

export function useGetProgramWorkouts(programId: string): UseGetProgramWorkoutsState {
  const [state, setState] = useState<UseGetProgramWorkoutsState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!programId) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let isMounted = true;

    const loadData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const result = await listProgramWorkouts(programId);

        if (isMounted) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Ошибка загрузки тренировок программы';
          setState({ data: null, loading: false, error: message });
          console.error('useGetProgramWorkouts error:', err);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [programId]);

  return state;
}