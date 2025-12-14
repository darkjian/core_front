/**
 * Workout types
 */
export interface Workout {
    id: string;
    title: string;
    day_of_week: string;
}

/**
 * Exercise types
 */
export interface Exercise {
    id: string;
    title: string;
    description: string;
    session_parameters: {
        reps: number;
        sets: number;
    };
}

/**
 * Program types
 */
export interface Program {
    id: string;
    title: string;
    description: string;
    created_at: string | Date;
}

/**
 * API Response types
 */
export interface ProgramWorkoutsResponse {
    program_name: string;
    workouts: Workout[];
}

export interface DailyWorkoutsResponse {
    program_name: string;
    workouts: Workout[];
}

export interface ProgramsResponse {
    programs: Program[];
}

/**
 * Page/Component specific types
 */
export interface ProgramData {
    program_name: string;
    workouts: Workout[];
}

/**
 * Auth types
 */
export interface Credentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token?: string;
    message?: string;
}
