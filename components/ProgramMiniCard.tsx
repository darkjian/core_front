import Link from 'next/link'
import type { FC } from 'react'
import type { Program } from '@/types'

interface ProgramMiniCardProps {
  program: Program
}

const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
}

const ProgramMiniCard: FC<ProgramMiniCardProps> = ({ program }) => {
  return (
    <Link
      className='group transition-color flex min-w-xs flex-col rounded-xl bg-white p-3 drop-shadow-lg duration-300 hover:bg-indigo-50'
      href={`/dashboard/programs/${program.id}`}
    >
      <span className='line-clamp-1 text-sm font-bold text-gray-700 group-hover:text-indigo-600'>{program.title}</span>
      <span className='line-clamp-1 text-xs text-gray-600'>{program.description}</span>
      <span className='mt-2 text-xs text-gray-400'>{formatDate(program.created_at)}</span>
    </Link>
  )
}

export default ProgramMiniCard
