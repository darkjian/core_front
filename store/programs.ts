import { create } from 'zustand';

interface ProgramsStore {
  viewMode: 'my' | 'templates';
  setViewMode: (mode: 'my' | 'templates') => void;
}

/**
 * Zustand store для состояния Programs страницы
 */
export const useProgramsStore = create<ProgramsStore>((set) => ({
  viewMode: 'my',
  setViewMode: (mode) => set({ viewMode: mode }),
}));
