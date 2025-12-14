import apiClient from "@/lib/api";

interface Credentials {
    email: string;
    password: string;
}

interface AuthResponse {
    token?: string;
    message?: string;
}

export async function login(credentials: Credentials): Promise<AuthResponse> {
    const response = await apiClient.post('/api/v1/auth/login', credentials);
    return response.data;
}

export async function register(credentials: Credentials): Promise<AuthResponse> {
    const response = await apiClient.post('/api/v1/auth/register', credentials);
    return response.data;
}