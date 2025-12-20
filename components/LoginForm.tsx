'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, FC, FormEvent } from 'react'
import { useLoginMutation } from '@/hooks/mutations/auth'

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [fieldError, setFieldError] = useState<string>('')
  const searchParams = useSearchParams()
  const fromUrl = searchParams.get('from')

  const loginMutation = useLoginMutation()
  const isPending = loginMutation.isPending
  const error = loginMutation.error

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setFieldError('')

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (!trimmedEmail || !trimmedPassword) {
      setFieldError('Заполните все поля')
      return
    }

    loginMutation.mutate({ email: trimmedEmail, password: trimmedPassword })
  }

  return (
    <div className='bg-background flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='border-border bg-card space-y-6 rounded-lg border p-8 shadow-lg'>
          <h1 className='text-foreground text-center text-3xl font-extrabold'>Вход</h1>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              type='email'
              placeholder='Почта'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-4 py-2 transition-colors focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
              disabled={isPending}
            />
            <input
              type='password'
              placeholder='Пароль'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-4 py-2 transition-colors focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
              disabled={isPending}
            />

            <div className='flex items-center justify-between gap-3 pt-4'>
              <Link href='/auth/register' className='text-primary hover:text-primary/80 font-medium transition'>
                Регистрация
              </Link>
              <button
                type='submit'
                disabled={isPending}
                className='bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring focus:ring-offset-background rounded-md px-6 py-2 font-medium transition focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
              >
                {isPending ? 'Вход...' : 'Войти'}
              </button>
            </div>
          </form>

          {(error || fieldError) && <p className='text-destructive py-4 text-center'>{error?.message || fieldError}</p>}
        </div>
      </div>
    </div>
  )
}

export default LoginForm
