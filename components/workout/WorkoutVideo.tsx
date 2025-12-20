'use client';

import { FC } from 'react';
import { ImageIcon } from 'lucide-react';

interface WorkoutVideoProps {
  videoUrl?: string;
  imageUrl?: string;
  title?: string;
}

/**
 * Компонент для отображения видео или картинки упражнения
 */
export const WorkoutVideo: FC<WorkoutVideoProps> = ({
  videoUrl,
  imageUrl,
  title = 'Упражнение',
}) => {
  return (
    <div className="w-full mb-8">
      {videoUrl ? (
        <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video">
          <iframe
            src={videoUrl}
            title={title}
            className="w-full h-full"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      ) : imageUrl ? (
        <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden aspect-video">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="relative w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <ImageIcon className="w-16 h-16 text-gray-400" />
            <p className="text-gray-500 font-medium">
              Видео/картинка упражнения
            </p>
            <p className="text-sm text-gray-400">
              Загрузится из API
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutVideo;
