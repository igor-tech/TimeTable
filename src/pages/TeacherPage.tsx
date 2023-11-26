import { useEffect } from 'react'

import { DaysCard } from '@/components/Card/DaysCard.tsx'
import { ButtonMenu } from '@/components/Shared/ButtonMenu.tsx'
import { DEFAULT_TEACHER_ID } from '@/components/config.ts'
import { CURRENT_ROLE } from '@/store/slices/initSlice.ts'
import { useTimeTable } from '@/store/store.ts'
import { Box, Text } from '@mantine/core'

export default function TeacherPage() {
  const {
    couple,
    teacherId,
    teacherList,
    setGroupId,
    filteredCoupleByGroupId,
    teacherCouple: data,
  } = useTimeTable()

  const handleUpdateTeacherId = (teacherId: string) => {
    setGroupId(teacherId, CURRENT_ROLE.TEACHER)
  }

  useEffect(() => {
    filteredCoupleByGroupId(CURRENT_ROLE.TEACHER)
  }, [couple, filteredCoupleByGroupId, teacherId])

  const teacherName = data && data?.[0]?.[0]?.teacherName

  return (
    <Box>
      <ButtonMenu
        data={teacherList}
        defaultData={DEFAULT_TEACHER_ID}
        label={'Преподаватель:'}
        onChangeSelect={handleUpdateTeacherId}
        placeholder={'Выберите перподавателя'}
        value={teacherId}
      />

      {data && data.length > 0 && (
        <Text fz={'lg'} mt={'15px'}>
          Расписание для преподавателя{' '}
          <Text fz={'lg'}>
            {teacherName?.[0]} (с {data[0][0].numberDay} по {data[data.length - 1][0].numberDay})
          </Text>
        </Text>
      )}

      {data && data.length > 0 && <DaysCard data={data} isTeacher />}

      {!data?.length && (
        <Text fw={'200'} fz={'xxxl'} mt={'150px'} ta={'center'}>
          Введите имя преподавателя
        </Text>
      )}
    </Box>
  )
}
