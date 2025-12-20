'use client'

import ProgramMiniCard from '@/components/ProgramMiniCard'
import { ProgramsSkeleton } from '@/components/skeletons/ProgramsSkeleton'
import { useGetUserPrograms, useGetTemplatePrograms } from '@/hooks/queries'
import { useProgramsStore } from '@/store'
import type { Program } from '@/types'
import { FC, ReactNode } from 'react'

const listPrograms = (programs: Program[]): ReactNode[] => {
  return programs.map((program) => <ProgramMiniCard key={program.id} program={program} />)
}

const Programs: FC = () => {
  const viewMode = useProgramsStore((state) => state.viewMode)
  const setViewMode = useProgramsStore((state) => state.setViewMode)

  // TanStack Query автоматически кэширует результаты
  const userPrograms = useGetUserPrograms()
  const templatePrograms = useGetTemplatePrograms()

  // Выбираем данные в зависимости от режима
  const isLoadingMy = viewMode === 'my' && userPrograms.isLoading
  const isLoadingTemplates = viewMode === 'templates' && templatePrograms.isLoading
  const isLoading = isLoadingMy || isLoadingTemplates

  const error = viewMode === 'my' ? userPrograms.error : templatePrograms.error
  const programs = viewMode === 'my' ? userPrograms.data?.programs || [] : templatePrograms.data?.programs || []

  if (isLoading) {
    return <ProgramsSkeleton />
  }

  if (error) {
    return (
      <>
        <h3 className='mb-5 text-2xl font-black text-gray-700 md:text-3xl'>Программы тренировок</h3>
        <span className='flex justify-center pt-64 text-sm text-red-400'>ошибка подключения к серверу</span>
      </>
    )
  }

  if (programs.length === 0) {
    return (
      <>
        <h3 className='mb-5 text-2xl font-black text-gray-700 md:text-3xl'>Программы тренировок</h3>
        <span className='flex justify-center pt-64 text-sm text-gray-400'>у вас пока нет созданных программ</span>
      </>
    )
  }

  return (
    <>
      <div className='flex flex-col items-center md:items-start'>
        <h3 className='mb-5 text-2xl font-black text-gray-700 md:text-3xl'>Программы</h3>
        <div className='mb-4 flex gap-2'>
          <button
            onClick={() => setViewMode('my')}
            className={`rounded px-4 py-2 ${
              viewMode === 'my' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Мои программы
          </button>
          <button
            onClick={() => setViewMode('templates')}
            className={`rounded px-4 py-2 ${
              viewMode === 'templates' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Шаблоны
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-3 md:items-start'>{listPrograms(programs)}</div>
    </>
  )
}

export default Programs
