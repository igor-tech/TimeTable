export function convertStringToDate(dateString: string, hours: number = 24): Date {
  const monthNames: { [key: string]: number } = {
    ['января']: 0,
    ['февраля']: 1,
    ['марта']: 2,
    ['апреля']: 3,
    ['мая']: 4,
    ['июня']: 5,
    ['июля']: 6,
    ['августа']: 7,
    ['сентября']: 8,
    ['октября']: 9,
    ['ноября']: 10,
    ['декабря']: 11,
  }

  const parts = dateString.split(' ')
  const day = parseInt(parts[0])
  const month = monthNames[parts[1]]
  const currentYear = new Date().getFullYear()

  return new Date(currentYear, month, day, hours)
}
