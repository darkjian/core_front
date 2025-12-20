import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

export interface User {
  id: string
  email: string
}

interface UserStore {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

/**
 * Zustand store для управления данными пользователя
 * Использует persist для сохранения в localStorage и devtools для отладки
 */
export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,

        setUser: (user) => {
          set(
            {
              user,
              isAuthenticated: user !== null,
            },
            undefined,
            'user/setUser',
          )
        },

        logout: () => {
          set(
            {
              user: null,
              isAuthenticated: false,
            },
            undefined,
            'user/logout',
          )
        },
      }),
      {
        name: 'user-store',
      },
    ),
    { name: 'UserStore' },
  ),
)
