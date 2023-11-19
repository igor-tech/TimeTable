export function getDay(date: Date) {
  const day = date.getDay()

  return day === 0 ? 6 : day - 1
}
