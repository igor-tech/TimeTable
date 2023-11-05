import { FC } from 'react'

import { TIME_DATA } from '@/components/config'
import { ICouple } from '@/types/types'
import { Box, Divider, Flex, Text } from '@mantine/core'

type Props = {
  couple: ICouple
  isTeacher?: boolean
}
export const Couple: FC<Props> = ({ couple, isTeacher = false }) => {
  const { coupleNumber, groupName, officeNumber, subjectName, teacherName } = couple

  return (
    <Box>
      <Divider label={`${coupleNumber} пара`} labelPosition={'center'} my={'xs'} />

      <Flex align={'center'} gap={'10px'} justify={'stretch'}>
        <Flex direction={'column'} ta={'center'}>
          <Text fz={'14px'} w={'50px'}>
            {TIME_DATA[coupleNumber][1]}
          </Text>
          <Text fz={'14px'} w={'50px'}>
            |
          </Text>
          <Text fz={'14px'} w={'50px'}>
            {TIME_DATA[coupleNumber][2]}
          </Text>
        </Flex>

        <Flex direction={'column'} gap={'3px'} w={'100%'}>
          <Text fw={700} fz={'14px'}>
            {subjectName ?? 'Название предмета не указано'}
          </Text>

          <Text fz={'14px'}>Преподаватель: {teacherName}</Text>
          <Flex justify={'space-between'}>
            {isTeacher && (
              <Text fw={'400'} fz={'14px'}>
                Группа: {groupName ?? 'группа не указана'}
              </Text>
            )}
            <Text fw={'500'} fz={'12px'}>
              Кабинет: {officeNumber ?? 'кабинет не указан'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
