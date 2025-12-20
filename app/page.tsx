import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { FC } from 'react'

const Home: FC = () => {
  return (
    <main className='flex min-h-screen items-center bg-gray-50'>
      <div className='max-2-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-12 sm:py-16 lg:py-20'>
          <section className='text-center'>
            <h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl'>Заголовок</h1>
            <p className='mt-4 text-lg text-gray-600 sm:text-xl lg:text-2xl'>Быстро, красиво, без лишних библиотек</p>
            <Button asChild size='lg' className='mt-8 bg-indigo-600 hover:bg-indigo-700'>
              <Link href='/auth/login'>Начать сейчас</Link>
            </Button>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Home
