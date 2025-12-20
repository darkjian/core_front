'use client'

import { useState, useEffect, useRef } from 'react'

export interface WorkoutSet {
  setNumber: number
  duration: number // в секундах
  timestamp: Date
}

interface UseWorkoutTimerState {
  // Текущий таймер
  seconds: number
  isRunning: boolean

  // Контролы
  start: () => void
  pause: () => void
  stop: () => void
  reset: () => void
  completeSet: () => void

  // История
  sets: WorkoutSet[]
  clearSets: () => void
}

/**
 * Хук для управления таймером тренировки
 */
export function useWorkoutTimer(): UseWorkoutTimerState {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [sets, setSets] = useState<WorkoutSet[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Основной таймер
  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const start = () => {
    setIsRunning(true)
  }

  const pause = () => {
    setIsRunning(false)
  }

  const stop = () => {
    setIsRunning(false)
    setSeconds(0)
  }

  const reset = () => {
    setIsRunning(false)
    setSeconds(0)
  }

  const completeSet = () => {
    const newSet: WorkoutSet = {
      setNumber: sets.length + 1,
      duration: seconds,
      timestamp: new Date(),
    }
    setSets((prev) => [...prev, newSet])
    setSeconds(0)
    setIsRunning(false)
  }

  const clearSets = () => {
    setSets([])
    setSeconds(0)
    setIsRunning(false)
  }

  return {
    seconds,
    isRunning,
    start,
    pause,
    stop,
    reset,
    completeSet,
    sets,
    clearSets,
  }
}

/**
 * Форматировать секунды в HH:MM:SS
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const pad = (num: number) => String(num).padStart(2, '0')

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
  }
  return `${pad(minutes)}:${pad(secs)}`
}
