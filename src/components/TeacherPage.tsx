import { FC, useEffect, useState } from 'react'

import { DaysCard } from '@/components/Card/DaysCard.tsx'
import { CustomSelect } from '@/components/CustomSelect.tsx'
import { DEFAULT_TEACHER_ID } from '@/components/config.ts'
import { divideArrayByNumberDay } from '@/helpers/divideArrayByNumberDay.ts'
import { ICouple, ITimeTable } from '@/types/types.ts'
import { Box, LoadingOverlay, Text } from '@mantine/core'

type Props = {
  onChangeDate: (date: Date) => void
  setTimeTable: (value: ITimeTable) => void
  timeTable: ITimeTable
}

export const TeacherPage: FC<Props> = ({ onChangeDate, setTimeTable, timeTable }) => {
  const [data, setData] = useState<ICouple[][]>()
  const [loading, setLoading] = useState<boolean>(true)

  const handleUpdateTeacherId = (teacherId: string) => {
    if (Object.keys(timeTable).length) {
      setTimeTable({ ...timeTable, teacherId })
    }
  }

  useEffect(() => {
    setLoading(true)
    if (Object.keys(timeTable).length) {
      const filteredData = timeTable.couple.filter(couple =>
        couple.teacherName.includes(timeTable.teacherId)
      )

      if (filteredData) {
        setData(divideArrayByNumberDay(filteredData))
      }
    }
    setLoading(false)
  }, [timeTable])

  if (loading) {
    return (
      <LoadingOverlay overlayProps={{ blur: 2, radius: 'sm' }} visible={loading} zIndex={1000} />
    )
  }

  const { teacherId, teacherList } = timeTable

  const teacherName = data && data?.[0]?.[0]?.teacherName

  const firstDayOfTheWeek = new Date(timeTable.firstDayOfWeek)

  return (
    <Box>
      <CustomSelect
        data={teacherList}
        defaultData={DEFAULT_TEACHER_ID}
        firstDayOfTheWeek={firstDayOfTheWeek}
        label={'Преподаватель:'}
        onChangeDate={onChangeDate}
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
