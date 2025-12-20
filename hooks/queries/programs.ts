import { useQuery } from '@tanstack/react-query'
import { listUserPrograms, listTemplatePrograms } from '@/services/programs'
import type { ProgramsResponse } from '@/types'

export function useGetUserPrograms() {
  return useQuery({
    queryKey: ['userPrograms'],
    queryFn: listUserPrograms,
  })
}

export function useGetTemplatePrograms() {
  return useQuery({
    queryKey: ['templatePrograms'],
    queryFn: listTemplatePrograms,
  })
}
