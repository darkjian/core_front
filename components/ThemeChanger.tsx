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
      className='absolute top-4 right-4'
      aria-label='Toggle theme'
    >
      {isDark ? <Sun className='h-3 w-3 text-yellow-500' /> : <Moon className='h-3 w-3 text-slate-700' />}
    </Switch>
  )
}

export default ThemeChanger
