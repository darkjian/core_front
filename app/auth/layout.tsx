'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { FC, ReactNode } from 'react'
import ThemeChanger from '@/components/ThemeChanger'

interface NavItem {
  name: string
  href: string
}

interface AuthLayoutProps {
  children: ReactNode
}

const navItems: NavItem[] = [
  { name: 'Главная', href: '/' },
  { name: 'Регистрация', href: '/auth/register' },
  { name: 'Логин', href: '/auth/login' },
]

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const pathname = usePathname()
  return (
    <>
      <header className='border-border bg-card border-b shadow-sm'>
        <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 items-center justify-between space-x-8'>
            <nav>
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-primary/10 hover:text-primary'
                    } `}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <ThemeChanger />
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default AuthLayout
