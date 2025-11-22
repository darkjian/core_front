import { apiFetch } from "@/lib/api";

export async function listUserPrograms() {
    return apiFetch('/api/v1/programs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

export async function listTemplatePrograms() {
    return apiFetch('/api/v1/programs/templates', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}