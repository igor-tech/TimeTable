import { FC } from 'react'

import { TIME_DATA } from '@/components/config.ts'
import { ICouple } from '@/types/types.ts'
import { Badge, Box, Divider, Flex, Text } from '@mantine/core'

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
          <Text fz={'md'} w={'50px'}>
            {TIME_DATA[coupleNumber][1]}
          </Text>
          <Text fz={'sm'} w={'50px'}>
            |
          </Text>
          <Text fz={'md'} w={'50px'}>
            {TIME_DATA[coupleNumber][2]}
          </Text>
        </Flex>

        <Flex direction={'column'} gap={'3px'} w={'100%'}>
          <Text fw={500} fz={'lg'}>
            {subjectName ?? 'Название предмета не указано'}
          </Text>

          <Text fz={'md'}>Преподаватель: {teacherName}</Text>
          <Flex justify={'space-between'}>
            {isTeacher && (
              <Text fw={'400'} fz={'sm'}>
                Группа: {groupName ?? 'группа не указана'}
              </Text>
            )}
            <Text fw={'500'} fz={'sm'}>
              Кабинет:{' '}
              <Badge color={'dark'} radius={'sm'} variant={'light'}>
                {officeNumber ?? 'кабинет не указан'}
              </Badge>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
