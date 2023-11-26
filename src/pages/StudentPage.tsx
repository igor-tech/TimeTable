import { useEffect } from 'react'

import { ButtonMenu } from '@/components/Shared/ButtonMenu.tsx'
import { CarouselStudentsGroup } from '@/components/Student/CarouselStudentsGroup.tsx'
import { DEFAULT_GROUP_ID } from '@/components/config.ts'
import { CURRENT_ROLE } from '@/store/slices/initSlice.ts'
import { useTimeTable } from '@/store/store.ts'
import { Box, Text } from '@mantine/core'

export default function StudentPage() {
  const { couple, studentsGroupsCouple, groupList, setGroupId, filteredCoupleByGroupId } =
    useTimeTable()

  const handleUpdateGroupId = (groupId: string) => {
    setGroupId(groupId, CURRENT_ROLE.STUDENT)
  }

  useEffect(() => {
    filteredCoupleByGroupId()
  }, [couple, filteredCoupleByGroupId])

  return (
    <Box>
      <ButtonMenu
        data={groupList}
        defaultData={DEFAULT_GROUP_ID}
        label={'Выбранные группы:'}
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
