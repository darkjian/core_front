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
        <div className='relative aspect-video w-full overflow-hidden rounded-lg bg-black'>
          <iframe
            src={videoUrl}
            title={title}
            className='h-full w-full'
            allowFullScreen
            allow='autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          />
        </div>
      ) : imageUrl ? (
        <div className='relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={title} className='h-full w-full object-cover' />
        </div>
      ) : (
        <div className='relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200'>
          <div className='flex flex-col items-center gap-3'>
            <ImageIcon className='h-16 w-16 text-gray-400' />
            <p className='font-medium text-gray-500'>Видео/картинка упражнения</p>
            <p className='text-sm text-gray-400'>Загрузится из API</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkoutVideo
