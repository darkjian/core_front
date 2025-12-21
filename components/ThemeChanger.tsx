'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

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
    <Switch
      checked={isDark}
      onCheckedChange={handleThemeChange}
      size='md'
      className='absolute top-4 right-4'
      aria-label='Toggle theme'
    >
      {isDark ? <Moon className='h-4 w-4 text-white' /> : <Sun className='h-4 w-4 text-yellow-500' />}
    </Switch>
  )
}

export default ThemeChanger
