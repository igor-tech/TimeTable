import { useEffect } from 'react'

import { CURRENT_ROLE } from '@/app/store/slices/initSlice.ts'
import { useTimeTable } from '@/app/store/store.ts'
import { DaysCard } from '@/common/components/Card/DaysCard.tsx'
import { ButtonMenu } from '@/common/components/Shared/ButtonMenu.tsx'
import { DEFAULT_TEACHER_ID } from '@/common/components/config.ts'
import { Box, LoadingOverlay, Text } from '@mantine/core'

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

  if (!data) {
    return <LoadingOverlay />
  }

  return (
    <Box>
      <ButtonMenu
        data={teacherList}
        defaultData={DEFAULT_TEACHER_ID}
        onChangeSelect={handleUpdateTeacherId}
        placeholder={'Выберите перподавателя'}
        value={teacherId}
      />

      {data && data.length > 0 && (
        <Text fz={'lg'} mt={'15px'}>
          Расписание для преподавателя{' '}
          <Text display={'inline'} fw={700} fz={'lg'} style={{ whiteSpace: 'nowrap' }}>
            {teacherName?.[0]}
          </Text>{' '}
          <Text display={'inline'} fz={'lg'} mt={'15px'} style={{ whiteSpace: 'nowrap' }}>
            (с {data[0][0].numberDay} по {data[data.length - 1][0].numberDay})
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
