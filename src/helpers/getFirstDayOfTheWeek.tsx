import { getDay } from '@/helpers/GetDay.tsx'

export function getFirstDayOfTheWeek(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - getDay(date))
}
