import { ObjWorkSheet } from '@/app/providers/store/slices/getLinkToScheduleSlice'
import { PracticeTypeValues } from '@/common/types'

export type ExtractedData = {
  link: null | string
  practiceType: PracticeTypeValues
  subjectTitleWithoutSurname: string
  surNames: string[]
}

export const extractNamesAndRemoveSlash = (obj: ObjWorkSheet): ExtractedData => {
  const clearSlashN = obj.v.replace(/\n/g, ' ').trim()

  let link = null

  if (obj?.l) {
    link = obj.l?.Target ?? null
  }

  const nameRegex = /([А-ЯЁ][а-яё]+)\s([А-ЯЁ]\.[А-ЯЁ]\.)/gi
  const slashAndCommaRegex = /[/,]/g

  const combinedRegex = new RegExp(`${nameRegex.source}|${slashAndCommaRegex.source}`, 'g')

  const surNames = formatNames(
    clearSlashN
      .replace(/\\/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/([А-ЯЁ][а-яё]+)([А-ЯЁ]\.[А-ЯЁ]\.)/gi, '$1 $2')
      .match(nameRegex)
  )
  const subjectTitleWithoutSurname =
    clearSlashN
      .replace(combinedRegex, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/\\/gi, '')
      .replace('С 09:00 до 14:00.', '')
      .trim() ?? 'Не указано название предмета'

  let practiceType: PracticeTypeValues = 'Lectures'

  if (obj.v.includes('Учебная практика')) {
    practiceType = 'Educational'
  } else if (obj.v.includes('Производственная практика')) {
    practiceType = 'Internship'
  } else if (obj.v.includes('Промежуточная аттестация')) {
    practiceType = 'Session'
  }

  return { practiceType, subjectTitleWithoutSurname, surNames, link }
}

function formatNames(names: RegExpMatchArray | null) {
  if (!names?.length) {
    return ['Преподаватель не указан']
  }

  return names.map(name => {
    const lowerCaseName = name.toLowerCase()
    const words = lowerCaseName.split(' ')

    const secondName = words[0][0].toUpperCase() + words[0].slice(1)
    const initials = words.length > 1 ? words[1].toUpperCase() : ''

    return `${secondName} ${initials}`
  })
}
