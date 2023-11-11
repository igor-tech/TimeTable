import { FC, useEffect, useState } from 'react'

import { DaysCard } from '@/components/Card/DaysCard.tsx'
import { DEFAULT_TEACHER_ID } from '@/components/config.ts'
import { divideArrayByNumberDay } from '@/helpers/divideArrayByNumberDay.ts'
import { ICouple, ITimeTable } from '@/types/types.ts'
import { Box, LoadingOverlay, Select, Text } from '@mantine/core'

type Props = {
  setTimeTable: (value: ITimeTable) => void
  timeTable: ITimeTable
}

export const TeacherPage: FC<Props> = ({ setTimeTable, timeTable }) => {
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

  return (
    <Box>
      <Select
        checkIconPosition={'right'}
        data={teacherList ?? [DEFAULT_TEACHER_ID]}
        defaultValue={teacherId}
        label={'Преподаватель:'}
        maxDropdownHeight={'350px'}
        onChange={value => handleUpdateTeacherId(value!)}
        placeholder={'Выберите перподавателя'}
        value={teacherId}
      />

      {data && data.length > 0 && (
        <Text fz={'18px'} mt={'15px'}>
          Расписание для преподавателя {teacherName}
          <Text>
            (с {data[0][0].numberDay} по {data[data.length - 1][0].numberDay})
          </Text>
        </Text>
      )}

      {data && data.length > 0 && <DaysCard data={data} />}

      {!data?.length && (
        <Text fw={'200'} fz={'25px'} mt={'150px'} ta={'center'}>
          Введите имя преподавателя
        </Text>
      )}
    </Box>
  )
}
