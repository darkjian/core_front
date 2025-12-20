'use client'

import ProgramMiniCard from '@/components/ProgramMiniCard'
import { ProgramsSkeleton } from '@/components/skeletons/ProgramsSkeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
        <h3 className='text-foreground mb-5 text-2xl font-black md:text-3xl'>Программы тренировок</h3>
        <span className='text-destructive flex justify-center pt-64 text-sm'>ошибка подключения к серверу</span>
      </>
    )
  }

  if (programs.length === 0) {
    return (
      <>
        <h3 className='text-foreground mb-5 text-2xl font-black md:text-3xl'>Программы тренировок</h3>
        <span className='text-muted-foreground flex justify-center pt-64 text-sm'>
          у вас пока нет созданных программ
        </span>
      </>
    )
  }

  return (
    <>
      <div className='mb-2 flex flex-col items-center md:items-start'>
        <h3 className='text-foreground mb-5 text-2xl font-black md:text-3xl'>Программы</h3>
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'my' | 'templates')}>
          <TabsList>
            <TabsTrigger value='my'>Мои программы</TabsTrigger>
            <TabsTrigger value='templates'>Шаблоны</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className='flex flex-col gap-3 md:items-start'>{listPrograms(programs)}</div>
    </>
  )
}

export default Programs
