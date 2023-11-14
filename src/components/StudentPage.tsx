import { FC, useEffect, useState } from 'react'

import { DaysCard } from '@/components/Card/DaysCard.tsx'
import { DEFAULT_GROUP_ID } from '@/components/config.ts'
import { Theme } from '@/constants/Theme.tsx'
import { divideArrayByNumberDay } from '@/helpers/divideArrayByNumberDay.ts'
import { ICouple, ITimeTable } from '@/types/types.ts'
import { Box, LoadingOverlay, Select, Text, rem } from '@mantine/core'

type Props = {
  setTimeTable: (value: ITimeTable) => void
  timeTable: ITimeTable
}

export const StudentPage: FC<Props> = ({ setTimeTable, timeTable }) => {
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

  return (
    <Box>
      <Select
        checkIconPosition={'right'}
        data={groupList ?? [DEFAULT_GROUP_ID]}
        defaultValue={groupId}
        label={'Группа:'}
        maw={'700px'}
        maxDropdownHeight={rem(450)}
        onChange={value => handleUpdateGroupId(value!)}
        placeholder={'Выберите группу'}
        styles={{
          dropdown: { boxShadow: '4px 4px 4px var(--mantine-color-gray-4)' },
          input: { fontSize: `${Theme.fontSizes.md}` },
          label: { fontSize: `${Theme.fontSizes.md}` },
          option: { fontSize: `${Theme.fontSizes.md}` },
        }}
        value={groupId}
      />

      {data && data.length > 0 && (
        <Text fz={'lg'} mt={'15px'}>
          Группа {groupName} (с {data[0][0].numberDay} по {data[data.length - 1][0].numberDay})
        </Text>
      )}

      {data && data.length > 0 && <DaysCard data={data} />}

      {!data?.length && (
        <Text fw={'200'} fz={'xxxl'} mt={'150px'} ta={'center'}>
          Выберите группу
        </Text>
      )}
    </Box>
  )
}
