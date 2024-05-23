import { convertStringToDate } from '@/common/utils/ConvertStringToDate'

export function convertTimeToTimestamp(time: string, numberDay: string): number {
  const [hours, minutes] = time.split(':')
  const date = convertStringToDate(numberDay, 0)

  date.setHours(Number(hours))
  date.setMinutes(Number(minutes))
  date.setSeconds(0)
  date.setMilliseconds(0)

  return date.getTime()
}
