export const TIME_DATA: Record<string, Record<string, string>> = {
  1: { 1: '08:30', 2: '10:05' },
  2: { 1: '10:15', 2: '11:50' },
  3: { 1: '12:00', 2: '13:35' },
  4: { 1: '14:15', 2: '15:50' },
  5: { 1: '16:00', 2: '17:35' },
  6: { 1: '17:45', 2: '19:20' },
} as const

export const DEFAULT_GROUP_ID = 'А-123/9'

export const DEFAULT_TEACHER_ID = 'Михайлова'

export const LOCAL_STORAGE_KEY = 'UKSAP'

export const currentCouple = [
  'В полном разгаре',
  'Текущая пара',
  'На данный момент',
  'Текущая лекция',
]

export const nextCouple = ['Следующая пара', 'На очереди', 'Следующий вызов', 'В ближайшее время']
