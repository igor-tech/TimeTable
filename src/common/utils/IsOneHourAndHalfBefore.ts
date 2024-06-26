export function isOneHourAndHalfBefore(targetTime: string): boolean {
  const currentTime = new Date()
  const [targetHour, targetMinute] = targetTime.split(':').map(Number)

  const targetDateTime = new Date()

  targetDateTime.setHours(targetHour, targetMinute)

  const oneHourBeforeTarget = new Date(targetDateTime.getTime() - 90 * 60 * 1000)

  return currentTime >= oneHourBeforeTarget && currentTime < targetDateTime
}
