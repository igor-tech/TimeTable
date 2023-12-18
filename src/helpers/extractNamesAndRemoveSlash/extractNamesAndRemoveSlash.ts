import { ObjWorkSheet } from '@/data/getExcelLink.ts'
import { PracticeTypeValues } from '@/types/types.ts'

export type ExtractedData = {
  link: null | string
  practiceType: PracticeTypeValues
  subjectTitleWithoutSurname: string
  surNames: string[]
}

export const extractNamesAndRemoveSlash = (obj: ObjWorkSheet): ExtractedData => {
  const clearSlashN = obj.v.replace(/\n/g, '')

  let link = null

  if (obj?.l) {
    link = obj.l?.Target ?? null
  }

  const nameRegex = /([А-ЯЁ][а-яё]+)\s?([А-ЯЁ]\.[А-ЯЁ]\.)/g
  const slashAndCommaRegex = /[/,]/g

  const combinedRegex = new RegExp(`${nameRegex.source}|${slashAndCommaRegex.source}`, 'g')

  const surNames = clearSlashN.replace(/\\/g, '').match(nameRegex) ?? ['Преподаватель не указан']
  const subjectTitleWithoutSurname =
    clearSlashN
      .replace(combinedRegex, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/\\/gi, '')
      .trim() ?? 'Не указано название предмета'

  let practiceType: PracticeTypeValues = null

  if (obj.v.includes('Учебная практика')) {
    practiceType = 'Educational'
  } else if (obj.v.includes('Производственная практика')) {
    practiceType = 'Internship'
  } else if (obj.v.includes('Промежуточная аттестация')) {
    practiceType = 'Session'
  }

  return { practiceType, subjectTitleWithoutSurname, surNames, link }
}
