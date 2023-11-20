export function isDayInCurrentWeek(day: Date): boolean {
  const today = new Date()

  const currentWeekStart = new Date(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
    0,
    0,
    0
  )
  const currentWeekEnd = new Date(
    currentWeekStart.getUTCFullYear(),
    currentWeekStart.getUTCMonth(),
    currentWeekStart.getUTCDate() + 6,
    23,
    59,
    59
  )

  return day >= currentWeekStart && day <= currentWeekEnd
}
