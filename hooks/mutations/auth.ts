'use client'

import { useMutation } from '@tanstack/react-query'
import { login, register } from '@/services/auth'
import type { Credentials, AuthResponse } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'

export function useLoginMutation() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromUrl = searchParams.get('from')

  return useMutation({
    mutationFn: (credentials: Credentials) => login(credentials),
    onSuccess: () => {
      const redirectTo = fromUrl?.startsWith('/dashboard') ? fromUrl : '/dashboard'
      router.push(redirectTo)
    },
  })
}

export function useRegisterMutation() {
  const router = useRouter()

  return useMutation({
    mutationFn: (credentials: Credentials) => register(credentials),
    onSuccess: () => {
      router.push('/auth/login')
    },
  })
}
