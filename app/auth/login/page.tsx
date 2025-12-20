import LoginForm from '@/components/LoginForm'
import type { FC } from 'react'
import { Suspense } from 'react'

const Login: FC = () => {
  return (
    <Suspense fallback={<div className='p-8 text-center'>Загрузка...</div>}>
      <LoginForm />
    </Suspense>
  )
}

export default Login
