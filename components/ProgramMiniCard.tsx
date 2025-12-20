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
      className='group transition-color border-border bg-card hover:bg-muted flex min-w-xs flex-col rounded-xl border p-3 drop-shadow-lg duration-300'
      href={`/dashboard/programs/${program.id}`}
    >
      <span className='text-foreground group-hover:text-primary line-clamp-1 text-sm font-bold'>{program.title}</span>
      <span className='text-muted-foreground line-clamp-1 text-xs'>{program.description}</span>
      <span className='text-muted-foreground/60 mt-2 text-xs'>{formatDate(program.created_at)}</span>
    </Link>
  )
}

export default ProgramMiniCard
