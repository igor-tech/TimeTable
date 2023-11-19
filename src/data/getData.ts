import { getExcelLink } from '@/data/getExcelLink.ts'
import { extractNamesAndRemoveSlash } from '@/helpers/extractNamesAndRemoveSlash/extractNamesAndRemoveSlash.ts'
import { DayOfWeek, ICouple } from '@/types/types.ts'
import { notifications } from '@mantine/notifications'
import { read, utils } from 'xlsx'

type Row = Record<string, string>

export const getData = async (firstDay: Date) => {
  try {
    const excelLink = await getExcelLink({ firstDay: firstDay })
    const response = await fetch(excelLink)
    const arrayBuffer = await response.arrayBuffer()
    const wb = read(arrayBuffer)
    const worksheet = wb.Sheets[wb.SheetNames[0]]
    const data_headers = Array(200)
      .fill(0)
      .map((_, i) => `${i + 1}`)
    const data: Row[] = utils.sheet_to_json<Row>(worksheet, { defval: null, header: data_headers })

    const courseNames = getCourseNamesArr(data)

    const groupNames = getGroupNamesArr(data, courseNames)

    const columnDays = getDaysNamesArr(data)

    const coupleNum = getNumberCoupleArr(data, columnDays)

    const result: ICouple[] = []

    for (let i = 0; i < groupNames.length; i++) {
      const { colNum, courseIndex, groupName } = groupNames[i]

      for (let j = 0; j < coupleNum.length; j++) {
        const { coupleValue, currentRawNumIndex, rawNum } = coupleNum[j]

        if (data?.[rawNum]?.[colNum] !== null) {
          const { practiceType, subjectTitleWithoutSurname, surNames } = extractNamesAndRemoveSlash(
            data?.[rawNum]?.[colNum]
          )

          if (!subjectTitleWithoutSurname) {
            continue
          }

          const dayOfTheWeek = columnDays[currentRawNumIndex].dayOfTheWeek as DayOfWeek

          const numberDay = columnDays[currentRawNumIndex].numberDay

          const teacherName = surNames

          const subjectName = subjectTitleWithoutSurname

          result.push({
            coupleNumber: coupleValue ?? 1,
            courseNumber: courseIndex + 1,
            dayOfTheWeek,
            groupName,
            numberDay,
            officeNumber: data?.[rawNum]?.[colNum + 1],
            practiceType,
            subjectName,
            teacherName,
          })
        }
      }
    }

    return result
  } catch (error) {
    notifications.show({
      color: 'red',
      message: error instanceof Error ? error.message : 'Error',
      title: 'Упс, возникала ошибка 🤥',
    })
    console.error(error)
  }
}

interface ICourseNames {
  colNum: string
  courseName: string
}

interface IColumnDays {
  dayOfTheWeek: string
  numberDay: string
  rawNum: number
}

interface GroupNames {
  colNum: number
  courseIndex: number
  groupName: string
}

interface INumberCouple {
  coupleValue: number | undefined
  currentRawNumIndex: number
  rawNum: number
}

const getCourseNamesArr = (data: Row[]): ICourseNames[] => {
  const courseNames = []

  for (const key in data[1]) {
    const value = data[1][key]

    if (value === null) {
      continue
    }
    const isCourse = value.replace(/\s/g, '').slice(-4).toLowerCase()

    if (isCourse === 'курс') {
      courseNames.push({ colNum: key, courseName: value })
    }
  }

  return courseNames
}

const getGroupNamesArr = (data: Row[], courseNames: ICourseNames[]): GroupNames[] => {
  const groupNames = []
  let currentCourseIndex = 0
  let courseName = courseNames[currentCourseIndex + 1]

  for (const key in data[2]) {
    const value = data[2][key]

    if (value === null) {
      continue
    }
    const regex = /-/
    const isGroup = regex.test(value)

    if (isGroup) {
      groupNames.push({ colNum: +key, courseIndex: currentCourseIndex, groupName: value })
    }

    if (courseName.colNum === key && currentCourseIndex + 2 < courseNames.length) {
      currentCourseIndex++
      courseName = courseNames[currentCourseIndex + 1]
    }
  }

  return groupNames
}

const getDaysNamesArr = (data: Row[]): IColumnDays[] => {
  const columnDays = []

  for (let i = 0; i < data.length; i++) {
    const value = data[i][1]

    if (value === null) {
      continue
    }

    const splitArray = value.split(', ')

    if (splitArray.length === 2) {
      const dayOfTheWeek = splitArray[0]
      const numberDay = splitArray[1]

      columnDays.push({ dayOfTheWeek, numberDay, rawNum: i })
    }
  }

  return columnDays
}

const getNumberCoupleArr = (data: Row[], columnDays: IColumnDays[]): INumberCouple[] => {
  const coupleNum = []
  let columnDaysIndex = 0
  let columnDay = columnDays[columnDaysIndex + 1]
  const mapNumerals = new Map([
    ['I', 1],
    ['II', 2],
    ['III', 3],
    ['IV', 4],
    ['IX', 9],
    ['V', 5],
    ['VI', 6],
    ['VII', 7],
    ['VIII', 8],
    ['X', 10],
  ])

  for (let i = columnDays[0].rawNum; i < data.length; i++) {
    const value = data[i][2]

    if (value === null) {
      continue
    }

    const isNumberCouple = mapNumerals.has(value)

    if (columnDay?.rawNum === i ?? true) {
      columnDaysIndex++
      columnDay = columnDays[columnDaysIndex + 1]
    }
    if (isNumberCouple) {
      coupleNum.push({
        coupleValue: mapNumerals.get(value),
        currentRawNumIndex: columnDaysIndex,
        rawNum: i,
      })
    }
  }

  return coupleNum
}
