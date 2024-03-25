import { useEffect } from 'react'

import { CURRENT_ROLE } from '@/app/store/slices/initSlice.ts'
import { useTimeTable } from '@/app/store/store.ts'
import { ButtonMenu } from '@/common/components/Shared/ButtonMenu.tsx'
import { CarouselStudentsGroup } from '@/common/components/Student/CarouselStudentsGroup.tsx'
import { DEFAULT_GROUP_ID } from '@/common/components/config.ts'
import { Box, LoadingOverlay, Text } from '@mantine/core'

export default function StudentPage() {
  const { couple, studentsGroupsCouple, groupList, setGroupId, filteredCoupleByGroupId } =
    useTimeTable()

  const handleUpdateGroupId = (groupId: string) => {
    setGroupId(groupId, CURRENT_ROLE.STUDENT)
  }

  useEffect(() => {
    filteredCoupleByGroupId()
  }, [couple, filteredCoupleByGroupId])

  if (!studentsGroupsCouple) {
    return <LoadingOverlay />
  }

  return (
    <Box>
      <ButtonMenu
        data={groupList}
        defaultData={DEFAULT_GROUP_ID}
        onChangeSelect={handleUpdateGroupId}
        placeholder={studentsGroupsCouple.length == 0 ? 'Выберите группу' : ''}
        value={DEFAULT_GROUP_ID}
      />

      <CarouselStudentsGroup />

      {!studentsGroupsCouple?.length && (
        <Text fw={'200'} fz={'xxxl'} mt={'150px'} ta={'center'}>
          Выберите группу
        </Text>
      )}
    </Box>
  )
}
