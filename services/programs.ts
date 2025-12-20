import apiClient from '@/lib/api'
import type { ProgramsResponse } from '@/types'

export async function listUserPrograms(): Promise<ProgramsResponse> {
  const response = await apiClient.get('/programs')
  return response.data
}

export async function listTemplatePrograms(): Promise<ProgramsResponse> {
  const response = await apiClient.get('/programs/templates')
  return response.data
}
