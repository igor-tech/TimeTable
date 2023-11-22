import { FC, useEffect, useState } from 'react'

import { DaysCard } from '@/components/Card/DaysCard.tsx'
import { CustomSelect } from '@/components/Shared/CustomSelect.tsx'
import { DEFAULT_GROUP_ID } from '@/components/config.ts'
import { divideArrayByNumberDay } from '@/helpers/divideArrayByNumberDay.ts'
import { ICouple, ITimeTable } from '@/types/types.ts'
import { Box, LoadingOverlay, Text } from '@mantine/core'

type Props = {
  onChangeDate: (date: Date) => void
  setTimeTable: (value: ITimeTable) => void
  timeTable: ITimeTable
}

export const StudentPage: FC<Props> = ({ onChangeDate, setTimeTable, timeTable }) => {
  const [data, setData] = useState<ICouple[][]>()
  const [loading, setLoading] = useState<boolean>(true)

  const handleUpdateGroupId = (groupId: string) => {
    setLoading(true)
    if (Object.keys(timeTable).length) {
      setTimeTable({ ...timeTable, groupId })
    }
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    if (!Object.keys(timeTable).length) {
      setLoading(false)

      return
    }

    const filteredData = timeTable.couple.filter(couple => couple.groupName === timeTable.groupId)

    if (filteredData) {
      setData(divideArrayByNumberDay(filteredData))
    }

    setLoading(false)
  }, [timeTable])

  if (loading) {
    return (
      <LoadingOverlay overlayProps={{ blur: 2, radius: 'sm' }} visible={loading} zIndex={1000} />
    )
  }

  const { groupId, groupList } = timeTable

  const groupName = data && data?.[0]?.[0]?.groupName

  const firstDayOfTheWeek = new Date(timeTable.firstDayOfWeek)

  return (
    <Box>
      <CustomSelect
        data={groupList}
        defaultData={DEFAULT_GROUP_ID}
        firstDayOfTheWeek={firstDayOfTheWeek}
        label={'Группа:'}
        onChangeDate={onChangeDate}
        onChangeSelect={handleUpdateGroupId}
        placeholder={'Выберите группу'}
        value={groupId}
      />
      {data && data.length > 0 && (
        <Text fz={'lg'} mt={'15px'}>
          Группа {groupName} (с {data[0][0].numberDay} по {data[data.length - 1][0].numberDay})
        </Text>
      )}

      {data && data.length > 0 && <DaysCard data={data} groupId={groupId} />}

      {!data?.length && (
        <Text fw={'200'} fz={'xxxl'} mt={'150px'} ta={'center'}>
          Выберите группу
        </Text>
      )}
    </Box>
  )
}
