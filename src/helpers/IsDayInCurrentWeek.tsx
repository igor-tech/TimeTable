export function isDayInCurrentWeek(day: Date): boolean {
  const today = new Date()
  const currentDayOfWeek = today.getDay()
  const mondayOffset = currentDayOfWeek > 0 ? currentDayOfWeek - 1 : 7
  const currentWeekStart = new Date(today.setDate(today.getDate() - mondayOffset))
  const currentWeekEnd = new Date(today.setDate(today.getDate() + 6))

  return day >= currentWeekStart && day <= currentWeekEnd
}
