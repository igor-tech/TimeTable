import { DEFAULT_GROUP_ID, DEFAULT_TEACHER_ID } from '@/components/config.ts'
import { ICouple, ITimeTable } from '@/types/types.ts'

export const getTimeTableData = (
  data: ICouple[],
  groupId: string,
  teacherId: string,
  firstDay: Date
): ITimeTable => {
  const groupList = Array.from(new Set(data?.map(couple => couple.groupName)))
  const teacherList: string[] = Array.from(
    new Set(data?.flatMap(val => val.teacherName).flat())
  ).sort((a, b) => (a.toLowerCase().charAt(0) < b.toLowerCase().charAt(0) ? -1 : 1))

  return {
    couple: data,
    firstDayOfWeek: firstDay.getTime(),
    groupId: groupId ?? DEFAULT_GROUP_ID,
    groupList,
    teacherId: teacherId ?? DEFAULT_TEACHER_ID,
    teacherList,
  }
}
