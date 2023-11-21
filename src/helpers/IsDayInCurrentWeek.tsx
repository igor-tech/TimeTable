import { getFirstDayOfTheWeek } from '@/helpers/getFirstDayOfTheWeek.tsx'

export function isDayInCurrentWeek(day: Date): boolean {
  const firstDayOfWeek = getFirstDayOfTheWeek(new Date())

  const currentWeekEnd = new Date(
    firstDayOfWeek.getUTCFullYear(),
    firstDayOfWeek.getUTCMonth(),
    firstDayOfWeek.getUTCDate() + 7,
    23,
    59,
    59
  )

  return day >= firstDayOfWeek && day <= currentWeekEnd
}
