import { DEFAULT_GROUP_ID, DEFAULT_TEACHER_ID } from '@/components/config.ts'
import { ICouple, ITimeTable } from '@/types/types.ts'

export const getTimeTableData = (data: ICouple[]): ITimeTable => {
  const groupList = Array.from(new Set(data?.map(couple => couple.groupName)))
  const teacherList = Array.from(new Set(data?.map(couple => couple.teacherName))).sort((a, b) =>
    a.toLowerCase().charAt(0) < b.toLowerCase().charAt(0) ? -1 : 1
  )

  return {
    couple: data,
    groupId: DEFAULT_GROUP_ID,
    groupList,
    teacherId: DEFAULT_TEACHER_ID,
    teacherList,
  }
}
