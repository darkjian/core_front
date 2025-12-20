'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '@/lib/utils'

type SwitchSize = 'sm' | 'md' | 'lg'

const sizeStyles: Record<SwitchSize, { root: string; thumb: string }> = {
  sm: {
    root: 'h-[1.15rem] w-8',
    thumb: 'size-4',
  },
  md: {
    root: 'h-7 w-12',
    thumb: 'size-6',
  },
  lg: {
    root: 'h-9 w-16',
    thumb: 'size-8',
  },
}

interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  children?: React.ReactNode
  size?: SwitchSize
}

function Switch({ className, children, size = 'md', ...props }: SwitchProps) {
  const { root, thumb } = sizeStyles[size]

  return (
    <SwitchPrimitive.Root
      data-slot='switch'
      className={cn(
        'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        root,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot='switch-thumb'
        className={cn(
          'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none flex items-center justify-center rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0',
          thumb,
        )}
      >
        {children}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch }
