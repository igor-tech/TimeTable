import { getDay } from '@/common/utils/GetDay'

export function getFirstDayOfTheWeek(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - getDay(date))
}
