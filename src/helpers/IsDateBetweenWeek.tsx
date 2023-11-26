import { getFirstDayOfTheWeek } from '@/helpers/getFirstDayOfTheWeek.tsx'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export function isDateBetweenWeek() {
  const firstDayOfTheWeek = getFirstDayOfTheWeek(new Date())
  const result1 = new Date(firstDayOfTheWeek.getTime())

  result1.setDate(result1.getDate() - 1)
  const result2 = new Date(firstDayOfTheWeek.getTime())

  result2.setDate(result2.getDate() + 6)

  return dayjs(new Date()).isBetween(result1, result2)
}
