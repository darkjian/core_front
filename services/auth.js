import { apiFetch } from "../lib/api";

export async function login(credentials) {
    return apiFetch('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}

export async function register(credentials) {
    return apiFetch('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}