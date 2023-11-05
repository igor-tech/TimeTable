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
  subjectName: string
  teacherName: string
}
