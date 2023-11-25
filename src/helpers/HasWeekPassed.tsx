import { getFirstDayOfTheWeek } from '@/helpers/getFirstDayOfTheWeek.tsx'

export function hasWeekPassed(day: Date): boolean {
  const firstDayOfWeek = getFirstDayOfTheWeek(day)
  const today = new Date()
  const currentWeekEnd = new Date(
    firstDayOfWeek.getUTCFullYear(),
    firstDayOfWeek.getUTCMonth(),
    firstDayOfWeek.getUTCDate() + 6,
    23,
    59,
    59
  )

  return today < currentWeekEnd
}
