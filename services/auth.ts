import apiClient from "@/lib/api";

export async function login(credentials) {
    const response = await apiClient.post('/api/v1/auth/login', credentials);
    return response.data;
}

export async function register(credentials) {
    const response = await apiClient.post('/api/v1/auth/register', credentials);
    return response.data;
}