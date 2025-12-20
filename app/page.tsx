import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { FC } from 'react'

const Home: FC = () => {
  return (
    <main className='bg-background flex min-h-screen items-center'>
      <div className='max-2-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-12 sm:py-16 lg:py-20'>
          <section className='text-center'>
            <h1 className='text-foreground text-4xl font-extrabold sm:text-5xl lg:text-6xl'>Заголовок</h1>
            <p className='text-muted-foreground mt-4 text-lg sm:text-xl lg:text-2xl'>
              Быстро, красиво, без лишних библиотек
            </p>
            <Button asChild size='lg' className='mt-8'>
              <Link href='/auth/login'>Начать сейчас</Link>
            </Button>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Home
