import apiClient from "@/lib/api";

export async function listProgramWorkouts(id) {
    const response = await apiClient.get(`/api/v1/programs/${id}/workouts?limit=10`);
    return response.data;
}

export async function listDailyWorkouts() {
    const response = await apiClient.get(`/api/v1/workouts/today?limit=10`);
    return response.data;
}

export async function listWorkoutExercises(id) {
    const response = await apiClient.get(`/api/v1/workouts/${id}/exercises`);
    return response.data;
}