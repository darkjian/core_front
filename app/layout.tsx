import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Providers } from './providers'

// сделай картинку public/og-image.jpg (1200×630)
export const metadata: Metadata = {
  title: 'Продающий Landing | Ваш Бренд',
  description: 'Быстро, красиво, без лишних библиотек. Создаём современные UI на Tailwind CSS.',
  keywords: 'tailwind css, next.js, landing page, ui design, go backend',
  authors: [{ name: 'Твой Бренд' }],
  openGraph: {
    title: 'Продающий Landing | Ваш Бренд',
    description: 'Быстро, красиво, без лишних библиотек.',
    url: 'https://yourdomain.com',
    siteName: 'Ваш Бренд',
    images: [
      {
        url: '/og-image.jpg', // 1200x630 — обязательно!
        width: 1200,
        height: 630,
        alt: 'Продающий Landing',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Продающий Landing | Ваш Бренд',
    description: 'Быстро, красиво, без лишних библиотек.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='ru'>
      <body className='antialiased'>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
