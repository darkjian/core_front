import { useQuery } from '@tanstack/react-query';
import {
  listDailyWorkouts,
  listProgramWorkouts,
  listWorkoutExercises,
} from '@/services/workouts';

export function useGetDailyWorkouts() {
  return useQuery({
    queryKey: ['dailyWorkouts'],
    queryFn: listDailyWorkouts,
  });
}

export function useGetProgramWorkouts(programId: string) {
  return useQuery({
    queryKey: ['programWorkouts', programId],
    queryFn: () => listProgramWorkouts(programId),
    enabled: !!programId,
  });
}

export function useGetWorkoutExercises(workoutId: string) {
  return useQuery({
    queryKey: ['workoutExercises', workoutId],
    queryFn: () => listWorkoutExercises(workoutId),
    enabled: !!workoutId,
  });
}
