export function checkTimeInInterval(startTime: string, endTime: string): boolean {
  const currentTime = new Date()
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)

  const startDateTime = new Date()

  startDateTime.setHours(startHour, startMinute)

  const endDateTime = new Date()

  endDateTime.setHours(endHour, endMinute)

  return currentTime >= startDateTime && currentTime <= endDateTime
}
