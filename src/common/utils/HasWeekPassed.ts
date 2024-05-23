// Проверяю закончилась ли учебная неделя, учебная неделя заканчивается в 6 вечера
import { getFirstDayOfTheWeek } from '@/common/utils/getFirstDayOfTheWeek'

export function hasWeekPassed(endOfLastCoupleTimeStamp: number): boolean {
  const firstDayOfWeek = getFirstDayOfTheWeek(new Date(endOfLastCoupleTimeStamp))
  const today = new Date()
  const currentWeekEnd = new Date(
    firstDayOfWeek.getUTCFullYear(),
    firstDayOfWeek.getUTCMonth(),
    firstDayOfWeek.getUTCDate() + 6,
    15,
    59,
    59
  )

  return today < currentWeekEnd
}
