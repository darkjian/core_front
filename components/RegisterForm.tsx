'use client'
import { useState, FC, FormEvent } from 'react'
import { useRegisterMutation } from '@/hooks/mutations/auth'

const RegisterForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [fieldError, setFieldError] = useState<string>('')

  const registerMutation = useRegisterMutation()
  const isPending = registerMutation.isPending
  const error = registerMutation.error

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setFieldError('')

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (!trimmedEmail || !trimmedPassword) {
      setFieldError('Заполните все поля')
      return
    }

    registerMutation.mutate({ email: trimmedEmail, password: trimmedPassword })
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
      <div className='w-full max-w-md'>
        <div className='space-y-6 rounded-lg bg-white p-8 shadow-lg'>
          <h1 className='text-center text-3xl font-extrabold text-gray-900'>Register</h1>

          <form onSubmit={handleOnSubmit} className='space-y-4'>
            <input
              type='text'
              value={email}
              placeholder='Почта'
              className='w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              disabled={isPending}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              value={password}
              placeholder='Пароль'
              className='w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              disabled={isPending}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type='submit'
              className='w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
              disabled={isPending}
            >
              {isPending ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>
          {(error || fieldError) && <p className='py-4 text-center text-red-500'>{error?.message || fieldError}</p>}
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
