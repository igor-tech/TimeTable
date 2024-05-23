import { GROUP_NAME } from '@/common/constants/config'

export type DayOfWeek =
  | 'Воскресенье'
  | 'Вторник'
  | 'Понедельник'
  | 'Пятница'
  | 'Среда'
  | 'Суббота'
  | 'Четверг'

// Интерфейс пары
export interface ICouple {
  coupleNumber: number // Номер пары
  courseNumber: number // Номер курса
  dayOfTheWeek: DayOfWeek // День недели
  groupName: string // Название группы
  numberDay: string // Номер дня
  officeNumber: string // Номер кабинета
  practiceType: PracticeTypeValues // Тип занятия
  subjectName: string // Название предмета
  teacherName: string[] // Список учителей ведущих пару
  link: null | string // Ссылка на онлайн занятие
  startTime: number // Время начала пары
  endTime: number // Время конца пары
}

// Интерфейс недельного расписания
export interface ITimeTable {
  couple: ICouple[] // Массив всех пар на неделю со всего расписания
  firstDayOfWeek: number // Первый день недели
  groupId: string // Текущая выбранная группа
  groupList: string[] // Список всех групп
  teacherId: string // Текущий выбранный учитель
  teacherList: string[] // Список всех учителей
}

export const PracticeValues = {
  EDUCATIONAL: 'Educational',
  INTERNSHIP: 'Internship',
  SESSION: 'Session',
  LECTURES: 'Lectures',
  NULL: null,
} as const

export type PracticeTypeValues = (typeof PracticeValues)[keyof typeof PracticeValues]

export type KeysGroupName = keyof typeof GROUP_NAME
