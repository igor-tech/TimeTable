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
  NULL: null,
} as const

export type PracticeTypeValues = (typeof PracticeValues)[keyof typeof PracticeValues]
