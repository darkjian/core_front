'use client';

import { useState, useEffect } from 'react';
import { listDailyWorkouts } from '@/services/workouts';
import type { DailyWorkoutsResponse } from '@/types';

export interface UseGetDailyWorkoutsState {
  data: DailyWorkoutsResponse | null;
  loading: boolean;
  error: string | null;
}

export function useGetDailyWorkouts(): UseGetDailyWorkoutsState {
  const [state, setState] = useState<UseGetDailyWorkoutsState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const result = await listDailyWorkouts();

        if (isMounted) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Ошибка загрузки тренировок';
          setState({ data: null, loading: false, error: message });
          console.error('useGetDailyWorkouts error:', err);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}