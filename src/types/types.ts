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

export interface ITimeTable {
  couple: ICouple[]
  groupId: string
  groupList: string[]
  teacherId: string
  teacherList: string[]
}
