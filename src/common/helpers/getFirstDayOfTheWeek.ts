import { getDay } from '@/common/helpers/GetDay.ts'

export function getFirstDayOfTheWeek(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - getDay(date))
}
