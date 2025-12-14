import apiClient from "@/lib/api";

interface Program {
    id: string;
    title: string;
    description: string;
    created_at: string | Date;
}

interface ProgramsResponse {
    programs: Program[];
}

export async function listUserPrograms(): Promise<ProgramsResponse> {
    const response = await apiClient.get('/programs');
    return response.data;
}

export async function listTemplatePrograms(): Promise<ProgramsResponse> {
    const response = await apiClient.get('/programs/templates');
    return response.data;
}