import { DayOfWeek, ICouple } from '@/types/types'
import { notifications } from '@mantine/notifications'
import { read, utils } from 'xlsx'

type Row = Record<string, string>

const execlLink =
  'https://docs.google.com/spreadsheets/d/1YUqQG8y6cQzhuZ72ggdKLTMR3mvoYzaZ/export?format=xlsx'

export const fetchData = async () => {
  try {
    const response = await fetch(execlLink)
    const arrayBuffer = await response.arrayBuffer()
    const wb = read(arrayBuffer)
    const worksheet = wb.Sheets[wb.SheetNames[0]]
    const data_headers = Array(200)
      .fill(0)
      .map((_, i) => `${i + 1}`)
    const data: Row[] = utils.sheet_to_json<Row>(worksheet, { defval: null, header: data_headers })

    // const regexTeacherName = /[\n\r]\s*([^/\n\r]+)/g
    const regexTeacherName = /^["'«“‘’]*[^\n]*\n\s*/
    const regexSubjectName = /^(.*?)\n/

    const getCourseNamesArr = () => {
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

    const courseNames = getCourseNamesArr()

    const getGroupNamesArr = () => {
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

    const groupNames = getGroupNamesArr()

    const getDaysNamesArr = () => {
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

    const columnDays = getDaysNamesArr()

    const getNumberCouple = () => {
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

    const coupleNum = getNumberCouple()

    const result: ICouple[] = []

    for (let i = 0; i < groupNames.length; i++) {
      const { colNum, courseIndex, groupName } = groupNames[i]

      for (let j = 0; j < coupleNum.length; j++) {
        const { coupleValue, currentRawNumIndex, rawNum } = coupleNum[j]

        if (data?.[rawNum]?.[colNum] !== null) {
          const dayOfTheWeek = columnDays[currentRawNumIndex].dayOfTheWeek as DayOfWeek

          const numberDay = columnDays[currentRawNumIndex].numberDay

          const teacherName =
            data?.[rawNum]?.[colNum]
              ?.toString()
              .replace(/"/g, ' ')
              .replace(regexTeacherName, ' ')
              .trim() ?? 'Not found'

          const subjectName =
            data?.[rawNum]?.[colNum]?.toString().match(regexSubjectName)?.[1].trim() ?? teacherName

          result.push({
            coupleNumber: coupleValue ?? 1,
            courseNumber: courseIndex + 1,
            dayOfTheWeek,
            groupName,
            numberDay,
            officeNumber: data?.[rawNum]?.[colNum + 1],
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
      message: 'dd',
      title: 'Упс, возникала ошибка 🤥',
    })
  }
}
