import apiClient from "@/lib/api";
import type { Credentials, AuthResponse } from "@/types";

export async function login(credentials: Credentials): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
}

export async function register(credentials: Credentials): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/register', credentials);
    return response.data;
}