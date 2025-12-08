import apiClient from "@/lib/api";

export async function listUserPrograms() {
    const response = await apiClient.get('/api/v1/programs');
    return response.data;
}

export async function listTemplatePrograms() {
    const response = await apiClient.get('/api/v1/programs/templates');
    return response.data;
}