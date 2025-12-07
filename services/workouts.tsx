import { apiFetch } from "@/lib/api";

export async function listProgramWorkouts(id) {
    return apiFetch(`/api/v1/programs/${id}/workouts?limit=10`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export async function listDailyWorkouts() {
    return apiFetch(`/api/v1/workouts/today?limit=10`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export async function listWorkoutExercises(id) {
    return apiFetch(`/api/v1/workouts/${id}/exercises`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}