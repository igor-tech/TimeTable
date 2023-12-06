import { notifications } from '@mantine/notifications'
import { read } from 'xlsx'

export type ObjWorkSheet = {
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

type WorkSheet = Record<string, ObjWorkSheet>

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

const generateExportLink = (target: Record<string, Record<string, string>>, data: WorkSheet) => {
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

    notifications.show({
      color: 'red',
      message: 'Нет расписания на эту неделю, выберите другую неделю',
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
