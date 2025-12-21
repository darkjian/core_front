import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
    <Link href={`/dashboard/programs/${program.id}`}>
      <Card className='group hover:bg-muted cursor-pointer transition-colors'>
        <CardHeader>
          <CardTitle className='group-hover:text-primary line-clamp-1'>{program.title}</CardTitle>
          <CardDescription className='line-clamp-1'>{program.description}</CardDescription>
        </CardHeader>
        <CardContent className='text-muted-foreground/60 text-xs'>{formatDate(program.created_at)}</CardContent>
      </Card>
    </Link>
  )
}

export default ProgramMiniCard
