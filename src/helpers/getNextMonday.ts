export const getNextMonday = () => {
  const today = new Date()
  const currentDayOfWeek = today.getDay()
  const daysUntilMonday = (currentDayOfWeek === 0 ? 1 : 8) - currentDayOfWeek
  const nextMonday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysUntilMonday
  )

  return nextMonday
}
