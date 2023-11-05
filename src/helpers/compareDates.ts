export function compareDates(date1: string, date2: string): number {
  const [day1, month1] = date1.split(' ')
  const [day2, month2] = date2.split(' ')

  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]

  const monthIndex1 = monthNames.findIndex(month => month === month1)
  const monthIndex2 = monthNames.findIndex(month => month === month2)

  if (monthIndex1 < monthIndex2) {
    return -1
  } else if (monthIndex1 > monthIndex2) {
    return 1
  } else {
    const dayNum1 = parseInt(day1, 10)
    const dayNum2 = parseInt(day2, 10)

    return dayNum1 - dayNum2
  }
}
