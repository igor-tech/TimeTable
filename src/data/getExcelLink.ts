import { LOCAL_STORAGE_KEY } from '@/components/config.ts'
import { notifications } from '@mantine/notifications'
import { read } from 'xlsx'

type Obj = {
  h: string
  l: {
    Target: string
    id: string
    ref: string
  }
  r: string
  t: string
  v: string
  w: string
}

type WorkSheet = Record<string, Obj>

const groupExcelLink =
  'https://docs.google.com/spreadsheets/d/1jrJfOegmc_OPvbWoMxUlXU2ujxqdFiRKuRQ_YiaxxOA/export?format=xlsx'

type Props = {
  firstDay: Date
}

export const getExcelLink = async ({ firstDay }: Props): Promise<string> => {
  try {
    const response = await fetch(groupExcelLink)
    const arrayBuffer = await response.arrayBuffer()
    const wb = read(arrayBuffer)
    const worksheet = wb.Sheets[wb.SheetNames[0]]

    const filteredData = filterWorksheetData(worksheet)
    const linkObject = getLastKey(filteredData, firstDay)
    const link = generateExportLink(linkObject, filteredData)

    return link
  } catch (error) {
    notifications.show({
      color: 'red',
      message: error instanceof Error ? error.message : 'Error',
      title: 'Упс, возникала ошибка 🤥',
    })
    console.error(error)

    return 'https://docs.google.com/spreadsheets/d/1YUqQG8y6cQzhuZ72ggdKLTMR3mvoYzaZ/export?format=xlsx'
  }
}

const filterWorksheetData = (worksheet: WorkSheet): WorkSheet => {
  const filteredData = {} as WorkSheet

  Object.keys(worksheet).forEach(key => {
    if (key.startsWith('A')) {
      filteredData[key] = worksheet[key]
    }
  })

  return filteredData
}

const getLastKey = (data: WorkSheet, firstDay: Date) => {
  const result = filterObjectByDate(data, firstDay)

  return result
}

const generateExportLink = (
  target: Record<string, Record<string, string>>,
  data: WorkSheet
): string => {
  const getBaseUrl = (url: string) => {
    const baseUrlRegex = /.*\//
    const matches = url.match(baseUrlRegex)

    return matches?.[0]
  }

  try {
    const baseUrl = getBaseUrl(target.l.Target)

    return `${baseUrl}export?format=xlsx`
  } catch (error) {
    const lastKeyData = Object.keys(data).length

    const lastData = data[`A${lastKeyData}`]

    const newDate = extractFirstDateFromString(lastData.w)?.getTime()

    const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!)

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ ...localStorageData, firstDayOfWeek: newDate })
    )

    notifications.show({
      color: 'red',
      message: 'Выберите правильную дату',
      title: 'Упс, возникла ошибка 🤥',
    })

    return getBaseUrl(lastData.l.Target) + 'export?format=xlsx'
  }
}

const filterObjectByDate = (worksheet: Record<string, any>, firstDay: Date): any | null => {
  let filteredObject: any | null = null

  for (const key in worksheet) {
    const object = worksheet[key]
    const dateString = object.v?.match(/\d{2}\.\d{2}\.\d{4}/)?.[0]

    if (dateString && firstDay) {
      const objectDate = convertStringToDate(dateString)

      if (objectDate && objectDate.getTime() === firstDay.getTime()) {
        filteredObject = object
        break
      }
    }
  }

  return filteredObject
}

function convertStringToDate(dateString: string): Date | null {
  const parts = dateString.split('.')

  if (parts.length !== 3) {
    // Если строка не соответствует ожидаемому формату, возвращаем null
    return null
  }

  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const year = parseInt(parts[2], 10)

  const date = new Date(year, month, day)

  if (isNaN(date.getTime())) {
    // Если дата некорректна (например, 30 февраля), возвращаем null
    return null
  }

  return date
}

function extractFirstDateFromString(str: string) {
  // Регулярное выражение для поиска даты в формате dd.mm.yyyy
  const dateRegex = /\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b/

  // Ищем первую дату в строке
  const match = str.match(dateRegex)

  if (match) {
    // Извлекаем значения компонентов даты из регулярного выражения
    const day = parseInt(match[1], 10)
    const month = parseInt(match[2], 10) - 1 // Месяцы в JavaScript начинаются с 0
    const year = parseInt(match[3], 10)

    // Создаем объект Date с извлеченной датой
    const date = new Date(year, month, day)

    return date
  }

  return null // Если дата не найдена, возвращаем null или другое значение по вашему выбору
}

console.log(extractFirstDateFromString('C 20.11.2023 по 25.11.2023'), 'dddd')
