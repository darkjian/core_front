import apiClient from "@/lib/api";
import type {  Exercise, ProgramWorkoutsResponse, DailyWorkoutsResponse } from "@/types";

export async function listProgramWorkouts(id: string): Promise<ProgramWorkoutsResponse> {
    const response = await apiClient.get(`/programs/${id}/workouts?limit=10`);
    return response.data;
}

export async function listDailyWorkouts(): Promise<DailyWorkoutsResponse> {
    const response = await apiClient.get('/workouts/today?limit=10');
    return response.data;
}

export async function listWorkoutExercises(id: string): Promise<Exercise[]> {
    const response = await apiClient.get(`/workouts/${id}/exercises`);
    return response.data;
}