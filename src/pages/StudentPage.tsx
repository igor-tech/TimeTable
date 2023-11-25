import { FC, memo, useEffect, useState } from 'react'

import { DaysCard } from '@/components/Card/DaysCard.tsx'
import { CustomSelect } from '@/components/Shared/CustomSelect.tsx'
import { OverlayLoader } from '@/components/Shared/OverlayLoader.tsx'
import { DEFAULT_GROUP_ID } from '@/components/config.ts'
import { divideArrayByNumberDay } from '@/helpers/divideArrayByNumberDay.ts'
import { CURRENT_ROLE } from '@/store/slices/initSlice.ts'
import { useTimeTable } from '@/store/store.ts'
import { ICouple } from '@/types/types.ts'
import { Box, Text } from '@mantine/core'

export const StudentPage: FC = memo(() => {
  const { couple, groupId, groupList, setGroupId, currentRole } = useTimeTable()
  const [data, setData] = useState<ICouple[][]>()
  const [loading, setLoading] = useState(true)

  const handleUpdateGroupId = (groupId: string) => {
    setGroupId(groupId, CURRENT_ROLE.STUDENT)
  }

  useEffect(() => {
    setLoading(true)
    if (couple) {
      const filteredData = couple.filter(couple => couple.groupName === groupId)

      if (filteredData) {
        setData(divideArrayByNumberDay(filteredData))
      }
    }
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [couple, groupId, currentRole])

  if (loading) {
    return <OverlayLoader />
  }

  const groupName = data && data?.[0]?.[0]?.groupName

  return (
    <Box
      mih={'100vh'}
      pos={'relative'}
      style={{ overflow: 'hidden', transition: '0.66s ease-out' }}
    >
      <CustomSelect
        data={groupList}
        defaultData={DEFAULT_GROUP_ID}
        label={'Группа:'}
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
})
