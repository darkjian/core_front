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
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
      <div className='w-full max-w-md'>
        <div className='space-y-6 rounded-lg bg-white p-8 shadow-lg'>
          <h1 className='text-center text-3xl font-extrabold text-gray-900'>Вход</h1>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              type='email'
              placeholder='Почта'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              disabled={isPending}
            />
            <input
              type='password'
              placeholder='Пароль'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              disabled={isPending}
            />

            <div className='flex items-center justify-between gap-3 pt-4'>
              <Link href='/auth/register' className='font-medium text-indigo-600 transition hover:text-indigo-700'>
                Регистрация
              </Link>
              <button
                type='submit'
                disabled={isPending}
                className='rounded-md bg-indigo-600 px-6 py-2 font-medium text-white transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
              >
                {isPending ? 'Вход...' : 'Войти'}
              </button>
            </div>
          </form>

          {(error || fieldError) && <p className='py-4 text-center text-red-500'>{error?.message || fieldError}</p>}
        </div>
      </div>
    </div>
  )
}

export default LoginForm
