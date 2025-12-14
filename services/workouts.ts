import apiClient from "@/lib/api";

interface Workout {
    id: string | number;
    title: string;
    day_of_week: string;
}

interface Exercise {
    id: string | number;
    title: string;
}

interface ProgramWorkoutsResponse {
    program_name: string;
    workouts: Workout[];
}

interface DailyWorkoutsResponse {
    program_name: string;
    workouts: Workout[];
}
export async function listProgramWorkouts(id: string | number): Promise<ProgramWorkoutsResponse> {
    const response = await apiClient.get(`/api/v1/programs/${id}/workouts?limit=10`);
    return response.data;
}

export async function listDailyWorkouts(): Promise<DailyWorkoutsResponse> {
    const response = await apiClient.get(`/api/v1/workouts/today?limit=10`);
    return response.data;
}

export async function listWorkoutExercises(id: string | number): Promise<Exercise[]> {
    const response = await apiClient.get(`/api/v1/workouts/${id}/exercises`);
    return response.data;
}