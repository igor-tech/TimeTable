import { FC, useEffect, useState } from 'react'

import { DaysCard } from '@/components/Card/DaysCard.tsx'
import { CustomSelect } from '@/components/Shared/CustomSelect.tsx'
import { OverlayLoader } from '@/components/Shared/OverlayLoader.tsx'
import { DEFAULT_TEACHER_ID } from '@/components/config.ts'
import { divideArrayByNumberDay } from '@/helpers/divideArrayByNumberDay.ts'
import { CURRENT_ROLE } from '@/store/slices/initSlice.ts'
import { useTimeTable } from '@/store/store.ts'
import { ICouple } from '@/types/types.ts'
import { Box, Text } from '@mantine/core'

export const TeacherPage: FC = () => {
  const { couple, teacherId, teacherList, setGroupId } = useTimeTable()
  const [data, setData] = useState<ICouple[][]>()
  const [loading, setLoading] = useState(true)
  const handleUpdateTeacherId = (teacherId: string) => {
    setGroupId(teacherId, CURRENT_ROLE.TEACHER)
  }

  useEffect(() => {
    setLoading(true)

    if (couple) {
      const filteredData = couple.filter(couple => couple.teacherName.includes(teacherId))

      if (filteredData) {
        setData(divideArrayByNumberDay(filteredData))
      }
    }
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [couple, teacherId])

  if (loading) {
    return <OverlayLoader />
  }

  const teacherName = data && data?.[0]?.[0]?.teacherName

  return (
    <Box mih={'100vh'}>
      <CustomSelect
        data={teacherList}
        defaultData={DEFAULT_TEACHER_ID}
        label={'Преподаватель:'}
        onChangeSelect={handleUpdateTeacherId}
        placeholder={'Выберите перподавателя'}
        value={teacherId}
      />

      {data && data.length > 0 && (
        <Text fz={'lg'} mt={'15px'}>
          Расписание для преподавателя {teacherName?.[0]} (с {data[0][0].numberDay} по{' '}
          {data[data.length - 1][0].numberDay})
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
