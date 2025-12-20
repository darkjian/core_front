'use client'

import { BicepsFlexed, Home, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { FC, ReactNode } from 'react'
import ThemeChanger from '@/components/ThemeChanger'

interface NavItem {
  href: string
  name: string
  icon: ReactNode
}

interface DashboardLayoutProps {
  children: ReactNode
}

const navItems: NavItem[] = [
  { href: '/dashboard', name: 'Home', icon: <Home className='h-5 w-5' /> },
  { href: '/dashboard/programs', name: 'Programs', icon: <BicepsFlexed className='h-5 w-5' /> },
  { href: '/dashboard/settings', name: 'Settings', icon: <Settings className='h-5 w-5' /> },
  { href: '/dashboard/profile', name: 'Profile', icon: <User className='h-5 w-5' /> },
]

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname()
  return (
    <>
      {/* Mobile bottom bar */}
      <nav className='fixed right-0 bottom-0 left-0 z-50 flex justify-around border-t border-gray-200 bg-white/95 backdrop-blur-sm md:hidden'>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 px-2 py-3 text-xs font-medium transition-all duration-200 ${
                isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              <div className={`transition-transform ${isActive ? 'scale-110' : ''}`}>{item.icon}</div>
              <span className={isActive ? 'font-semibold' : ''}>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Desktop sidebar */}
      <nav className='fixed top-0 left-0 hidden h-full w-64 flex-col border-r border-gray-200 bg-white md:flex'>
        <div className='flex-1 space-y-1 p-4 pt-20'>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                <div className={isActive ? '' : 'text-gray-500 group-hover:text-indigo-600'}>{item.icon}</div>
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      <div className='min-h-screen bg-gray-50'>
        <div className='pb-16 md:pb-0 md:pl-64'>
          <main className='mx-auto max-w-7xl px-4 py-8 transition-all duration-300 ease-in-out sm:px-6 lg:px-8'>
            {children}
            <ThemeChanger />
          </main>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
