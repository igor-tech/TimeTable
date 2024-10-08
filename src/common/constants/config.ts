export const TIME_DATA: Record<string, Record<string, string>> = {
  1: { 1: '08:30', 2: '10:05' },
  2: { 1: '10:15', 2: '11:50' },
  3: { 1: '12:00', 2: '13:35' },
  4: { 1: '14:15', 2: '15:50' },
  5: { 1: '16:00', 2: '17:35' },
  6: { 1: '17:45', 2: '19:20' },
} as const

export const SIXTY_MINUTES = 60 * 1000

export const DEFAULT_GROUP_ID = 'А-123/9'

export const DEFAULT_TEACHER_ID = 'Михайлова'

export const currentCouple = [
  'В полном разгаре',
  'Текущая пара',
  'На данный момент',
  'Текущая лекция',
]

export const nextCouple = ['Следующая пара', 'На очереди', 'В ближайшее время']

export const GROUP_NAME = {
  ['А']: '⛩️ Архитектура',
  ['АП']: '⛩️ Архитектура',
  ['ГД']: '🖥️ Графический дизайн',
  ['ГРД']: '🏘️ Градостроительство',
  ['Д']: '👜 Дизайн (по отраслям)',
  ['ДП']: '👜 Дизайн (по отраслям)',
  ['З']: '🌎 Земельно-имущественные отношения',
  ['ЗИО']: '🌎 Земельно-имущественные отношения',
  ['ИС']: '💻 Информационные системы',
  ['Л']: '🚛 Операционная деятельность в логистике',
  ['М']: '🚗 Механика',
  ['Р']: '🗿  Художественная древообработка',
  ['С']: '🏗️ Строительство и эксплуатация зданий и сооружений',
  ['СП']: '🏗️ Строительство и эксплуатация зданий и сооружений',
  ['ТГ']: '🗺️ Туризм и гостеприимство',
  ['Т']: '🗺️ Туризм и гостеприимство',
  ['УМД']: '👷 Эксплуатация и обслуживание многоквартирного дом',
  ['ИМ']: '👷 Информационное моделирование в строительстве',
  ['ЭД']:
    '🚜 Техническая эксплуатация подъемно-транспортных, строительных и дорожных машин и оборудования',
  ['Остальные']: 'Остальные группы',
}

export const CLASS_ROOM_HOURS_DATA = [
  { end: '09:20 - 10:05', lesson: '😀 1 пара', start: '08:30 - 09:15' },
  { end: '11:05 - 11:50', lesson: '🙂 2 пара', start: '10:15 - 11:00' },
  { end: '12:50 - 13:35', lesson: '🧐 3 пара', start: '12:00 - 12:45' },
  { end: 'до 14:15', lesson: 'Перерыв', start: 'с 13:35' },
  { end: '15:05 - 15:50', lesson: '😏 4 пара', start: '14:15 - 15:00' },
  { end: '16:50 - 17:35', lesson: '😐 5 пара', start: '16:00 - 16:45' },
  { end: '18:35 - 19:20', lesson: '🙄 6 пара', start: '17:45 - 18:30' },
]

export const SESSION_LINK_BY_COURSE: Record<string, string> = {
  '1': 'https://drive.google.com/file/d/1x-lDkmEiZvL_sgACYp7da4HIRKlTBRgy/view?usp=sharing',
  '2': 'https://drive.google.com/file/d/1MdRzZKlUsguGmFDt2CkfCGzS6gSk0YfT/view?usp=sharing',
  '3': 'https://drive.google.com/file/d/1g_pY5rcpZ2R2fYVxdzwKRfcBgBENrv-V/view?usp=sharing',
  '4': 'https://drive.google.com/file/d/1O06-V9POv25ZuvO0vSeVhQrF3B_OvZGP/view?usp=sharing',
  '5': 'https://drive.google.com/file/d/1GWTqPK6SSOIXVWr22S_mjF8OMpD97M_a/view?usp=sharing',
}

export const UKSAP_URL = 'https://www.uksap.ru/'

export const BANNER_FORM_URL = 'https://forms.gle/ssGmW4r5vy7PJZ2f6'
