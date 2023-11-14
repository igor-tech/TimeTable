import { FC, useEffect, useState } from 'react'

import { DaysCard } from '@/components/Card/DaysCard.tsx'
import { DEFAULT_TEACHER_ID } from '@/components/config.ts'
import { Theme } from '@/constants/Theme.tsx'
import { divideArrayByNumberDay } from '@/helpers/divideArrayByNumberDay.ts'
import { ICouple, ITimeTable } from '@/types/types.ts'
import { Box, LoadingOverlay, Select, Text, rem } from '@mantine/core'

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
        maw={'700px'}
        maxDropdownHeight={rem(450)}
        onChange={value => handleUpdateTeacherId(value!)}
        placeholder={'Выберите перподавателя'}
        styles={{
          dropdown: { boxShadow: '4px 4px 4px var(--mantine-color-gray-4)' },
          input: { fontSize: `${Theme.fontSizes.md}` },
          label: { fontSize: `${Theme.fontSizes.md}` },
          option: { fontSize: `${Theme.fontSizes.md}` },
        }}
        value={teacherId}
      />

      {data && data.length > 0 && (
        <Text fz={'lg'} mt={'15px'}>
          Расписание для преподавателя {teacherName} (с {data[0][0].numberDay} по{' '}
          {data[data.length - 1][0].numberDay})
        </Text>
      )}

      {data && data.length > 0 && <DaysCard data={data} />}

      {!data?.length && (
        <Text fw={'200'} fz={'xxxl'} mt={'150px'} ta={'center'}>
          Введите имя преподавателя
        </Text>
      )}
    </Box>
  )
}
