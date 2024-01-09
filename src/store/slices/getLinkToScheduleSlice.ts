import { getFirstDayOfTheWeek } from '@/helpers/getFirstDayOfTheWeek.tsx'
import { handleCatchError } from '@/helpers/handleCatchError.ts'
import { BoundStore } from '@/store/store.ts'
import { GenericStateCreator } from '@/store/types.ts'
import { produce } from 'immer'
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

export interface IGetLinkToSchedule {
  getExcelLink: (firstDay: Date) => Promise<null | string>
  filterObjectByDate: (worksheet: Record<string, any>, firstDay: Date) => any | null
  generateExportLink: (target: Record<string, Record<string, string>>, data: WorkSheet) => string
  getLastKey: (data: WorkSheet, firstDay: Date) => any
  filterWorksheetData: (worksheet: WorkSheet) => WorkSheet
  convertStringToDate: (dateString: string) => Date | null
}

export const getLinkToScheduleSlice: GenericStateCreator<BoundStore> = (set, get) => ({
  ...get(),

  getExcelLink: async firstDay => {
    try {
      const response = await fetch(groupExcelLink)
      const arrayBuffer = await response.arrayBuffer()
      const wb = read(arrayBuffer)
      const worksheet = wb.Sheets[wb.SheetNames[0]]

      const filteredData = get().filterWorksheetData(worksheet)
      const linkObject = get().getLastKey(filteredData, firstDay)

      return get().generateExportLink(linkObject, filteredData)
    } catch (error) {
      handleCatchError(error, error instanceof Error ? error.message : 'Error')

      return null
    }
  },

  filterWorksheetData: (worksheet: WorkSheet): WorkSheet => {
    const filteredData = {} as WorkSheet

    Object.keys(worksheet).forEach(key => {
      if (key.startsWith('A')) {
        filteredData[key] = worksheet[key]
      }
    })

    return filteredData
  },

  getLastKey: (data: WorkSheet, firstDay: Date) => {
    return get().filterObjectByDate(data, firstDay)
  },

  generateExportLink: (target: Record<string, Record<string, string>>, data: WorkSheet) => {
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

      handleCatchError(
        error,
        'Упс, возникла ошибка 🤥',
        'Нет расписания на эту неделю, выберите другую неделю'
      )

      set(
        produce((state: BoundStore) => {
          state.firstDayOfWeek = getFirstDayOfTheWeek(new Date()).getTime()
        })
      )

      return getBaseUrl(lastData.l.Target) + 'export?format=xlsx'
    }
  },

  filterObjectByDate: (worksheet: Record<string, any>, firstDay: Date): ObjWorkSheet | null => {
    let filteredObject: ObjWorkSheet | null = null

    for (const key in worksheet) {
      const object = worksheet[key]
      const dateString = object.v?.match(/\d{2}\.\d{2}\.\d{4}/)?.[0]

      if (dateString && firstDay) {
        const objectDate = get().convertStringToDate(dateString)

        const lastDayOfTheWeek = new Date(
          firstDay.getTime() + (6 - firstDay.getDay()) * 24 * 60 * 60 * 1000
        )

        if (
          objectDate &&
          firstDay.getTime() <= objectDate.getTime() &&
          objectDate.getTime() <= lastDayOfTheWeek.getTime()
        ) {
          filteredObject = object
          break
        }
      }
    }

    return filteredObject
  },

  convertStringToDate: (dateString: string): Date | null => {
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
  },
})
