import apiClient from "@/lib/api";

interface Workout {
    id: string;
    title: string;
    day_of_week: string;
}

interface Exercise {
    id: string;
    title: string;
    description: string;
    session_parameters: {
        reps: number;
        sets: number;
    };
}

interface ProgramWorkoutsResponse {
    program_name: string;
    workouts: Workout[];
}

interface DailyWorkoutsResponse {
    program_name: string;
    workouts: Workout[];
}

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