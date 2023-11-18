import { PracticeTypeValues } from '@/types/types.ts'

export type ExtractedData = {
  practiceType: PracticeTypeValues
  subjectTitleWithoutSurname: string
  surNames: string[]
}

export const extractNamesAndRemoveSlash = (str: string): ExtractedData => {
  const clearSlashN = str.replace(/\n/g, '')

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

  if (str.includes('Учебная практика')) {
    practiceType = 'Educational'
  } else if (str.includes('Производственная практика')) {
    practiceType = 'Internship'
  }

  return { practiceType, subjectTitleWithoutSurname, surNames }
}
