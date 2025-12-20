'use client'

import { FC } from 'react'
import { ImageIcon } from 'lucide-react'

interface WorkoutVideoProps {
  videoUrl?: string
  imageUrl?: string
  title?: string
}

/**
 * Компонент для отображения видео или картинки упражнения
 */
export const WorkoutVideo: FC<WorkoutVideoProps> = ({ videoUrl, imageUrl, title = 'Упражнение' }) => {
  return (
    <div className='mb-8 w-full'>
      {videoUrl ? (
        <div className='bg-background relative aspect-video w-full overflow-hidden rounded-lg'>
          <iframe
            src={videoUrl}
            title={title}
            className='h-full w-full'
            allowFullScreen
            allow='autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          />
        </div>
      ) : imageUrl ? (
        <div className='bg-muted relative aspect-video w-full overflow-hidden rounded-lg'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={title} className='h-full w-full object-cover' />
        </div>
      ) : (
        <div className='from-muted to-muted/50 relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br'>
          <div className='flex flex-col items-center gap-3'>
            <ImageIcon className='text-muted-foreground h-16 w-16' />
            <p className='text-muted-foreground font-medium'>Видео/картинка упражнения</p>
            <p className='text-muted-foreground/70 text-sm'>Загрузится из API</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkoutVideo
