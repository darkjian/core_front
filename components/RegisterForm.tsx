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
    <div className='bg-background flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='border-border bg-card space-y-6 rounded-lg border p-8 shadow-lg'>
          <h1 className='text-foreground text-center text-3xl font-extrabold'>Register</h1>

          <form onSubmit={handleOnSubmit} className='space-y-4'>
            <input
              type='text'
              value={email}
              placeholder='Почта'
              className='border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-4 py-2 transition-colors focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
              disabled={isPending}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              value={password}
              placeholder='Пароль'
              className='border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-4 py-2 transition-colors focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
              disabled={isPending}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type='submit'
              className='bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring focus:ring-offset-background w-full rounded-md px-4 py-2 font-medium transition focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
              disabled={isPending}
            >
              {isPending ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>
          {(error || fieldError) && <p className='text-destructive py-4 text-center'>{error?.message || fieldError}</p>}
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
