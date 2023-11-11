import { notifications } from '@mantine/notifications'
import { read } from 'xlsx'

type WorkSheet = Record<string, Record<string, Record<string, string>>>

const groupExcelLink =
  'https://docs.google.com/spreadsheets/d/1jrJfOegmc_OPvbWoMxUlXU2ujxqdFiRKuRQ_YiaxxOA/export?format=xlsx'

export const getExcelLink = async (): Promise<string> => {
  try {
    const response = await fetch(groupExcelLink)
    const arrayBuffer = await response.arrayBuffer()
    const wb = read(arrayBuffer)
    const worksheet = wb.Sheets[wb.SheetNames[0]]

    const filteredData = filterWorksheetData(worksheet)
    const lastKey = getLastKey(filteredData)
    const link = generateExportLink(filteredData[lastKey])

    return link
  } catch (error) {
    notifications.show({
      color: 'red',
      message: error instanceof Error ? error.message : 'Error',
      title: 'Упс, возникала ошибка 🤥',
    })

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

const getLastKey = (data: WorkSheet): string => {
  const keys = Object.keys(data)

  return keys[keys.length - 1]
}

const generateExportLink = (target: Record<string, Record<string, string>>): string => {
  const baseUrl = target.l.Target.match(/.*\//)?.[0]

  return `${baseUrl}export?format=xlsx`
}
