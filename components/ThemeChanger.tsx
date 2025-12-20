'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === 'dark'

  const handleThemeChange = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <button
      onClick={handleThemeChange}
      className='absolute top-4 right-4 rounded-md p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700'
      aria-label='Toggle theme'
    >
      {isDark ? <Sun className='h-5 w-5 text-yellow-500' /> : <Moon className='h-5 w-5 text-gray-600' />}
    </button>
  )
}

export default ThemeChanger
