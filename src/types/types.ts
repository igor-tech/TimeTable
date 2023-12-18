import { GROUP_NAME } from '@/components/config.ts'

export type DayOfWeek =
  | 'Воскресенье'
  | 'Вторник'
  | 'Понедельник'
  | 'Пятница'
  | 'Среда'
  | 'Суббота'
  | 'Четверг'

export interface ICouple {
  coupleNumber: number
  courseNumber: number
  dayOfTheWeek: DayOfWeek
  groupName: string
  numberDay: string
  officeNumber: string
  practiceType: PracticeTypeValues
  subjectName: string
  teacherName: string[]
  link: null | string
}

export interface ITimeTable {
  couple: ICouple[]
  firstDayOfWeek: number
  groupId: string
  groupList: string[]
  teacherId: string
  teacherList: string[]
}

export const PracticeValues = {
  EDUCATIONAL: 'Educational',
  INTERNSHIP: 'Internship',
  SESSION: 'Session',
  NULL: null,
} as const

export type PracticeTypeValues = (typeof PracticeValues)[keyof typeof PracticeValues]

export type KeysGroupName = keyof typeof GROUP_NAME
