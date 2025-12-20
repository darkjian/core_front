import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ProgramsStore {
  viewMode: 'my' | 'templates'
  setViewMode: (mode: 'my' | 'templates') => void
}

/**
 * Zustand store для состояния Programs страницы
 */
export const useProgramsStore = create<ProgramsStore>()(
  devtools(
    (set) => ({
      viewMode: 'my',
      setViewMode: (mode) => set({ viewMode: mode }, undefined, 'programs/setViewMode'),
    }),
    { name: 'ProgramsStore' },
  ),
)
