import { useEffect } from 'react'

import { CURRENT_ROLE } from '@/app/providers/store/slices/initSlice'
import { useTimeTable } from '@/app/providers/store/store'
import { DEFAULT_GROUP_ID } from '@/common/constants/config'
import { CarouselStudentsGroup } from '@/components/ui/carousel-students-group'
import { CustomSelect } from '@/components/ui/custom-select'
import { Box, LoadingOverlay, Text } from '@mantine/core'

export function StudentPage() {
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
      <CustomSelect
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
