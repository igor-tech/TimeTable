import { FC } from 'react'

import { TIME_DATA, currentCouple, nextCouple } from '@/components/config.ts'
import { ColorScheme } from '@/constants/colorShceme.ts'
import { checkTimeInInterval } from '@/helpers/CheckTimeInInterval.tsx'
import { isOneHourBefore } from '@/helpers/IsOneHourBefore.tsx'
import { randomInteger } from '@/helpers/RandomInteger.tsx'
import { ICouple } from '@/types/types.ts'
import { Badge, Card, Flex, Group, Text, useMantineColorScheme } from '@mantine/core'
import { FiMinus } from 'react-icons/fi'

type Props = {
  couple: ICouple
  isTeacher?: boolean
}
export const Couple: FC<Props> = ({ couple, isTeacher = false }) => {
  const { coupleNumber, groupName, officeNumber, subjectName, teacherName } = couple

  const { colorScheme } = useMantineColorScheme()

  const isDarkTheme = ColorScheme.Dark === colorScheme

  const isCurrentCouple = checkTimeInInterval(
    TIME_DATA[coupleNumber][1],
    TIME_DATA[coupleNumber][2]
  )
  const isNextCouple = isOneHourBefore(TIME_DATA[coupleNumber][1])

  const randomIndex = randomInteger(4)

  return (
    <Card
      radius={'md'}
      shadow={'xl'}
      styles={{
        root: isCurrentCouple
          ? {
              transform: 'scale(1.03, 1.1) translateY(10px)',
              zIndex: '1',
            }
          : {},
        section: isCurrentCouple ? { borderColor: 'var(--mantine-color-green-2)' } : {},
      }}
      withBorder
    >
      <Card.Section py={'sm'} withBorder>
        <Group justify={'space-between'}>
          <Text fw={500}>{coupleNumber} пара</Text>

          {isCurrentCouple && (
            <Badge color={'green'} fz={'xs'} radius={'xs'} size={'md'} variant={'light'}>
              {currentCouple[randomIndex]}
            </Badge>
          )}

          {isNextCouple && (
            <Badge
              color={'orange'}
              fz={'xs'}
              ml={'10px'}
              radius={'lg'}
              size={'md'}
              variant={'transparent'}
            >
              {nextCouple[randomIndex]}
            </Badge>
          )}

          <Flex align={'center'} ta={'center'}>
            <Text fz={'md'} w={'50px'}>
              {TIME_DATA[coupleNumber][1]}
            </Text>
            <FiMinus size={15} />
            <Text fz={'md'} w={'50px'}>
              {TIME_DATA[coupleNumber][2]}
            </Text>
          </Flex>
        </Group>
      </Card.Section>
      <Card.Section py={'lg'}>
        <Flex direction={'column'} gap={'3px'} w={'100%'}>
          <Text fw={500} fz={'lg'}>
            {subjectName ?? 'Название предмета не указано'}
          </Text>

          <Text fz={'md'}>Преподаватель: {teacherName}</Text>
        </Flex>
        <Flex justify={'space-between'} mt={'10px'}>
          <Text fw={'500'} fz={'sm'}>
            Кабинет:
            <Badge
              color={'green'}
              component={'p'}
              fz={'xs'}
              ml={'10px'}
              radius={'sm'}
              size={'md'}
              variant={isDarkTheme ? 'filled' : 'light'}
            >
              {officeNumber ?? 'кабинет не указан'}
            </Badge>
          </Text>
          {isTeacher && (
            <Text fw={'500'} fz={'sm'}>
              Группа:
              <Badge
                color={'blue'}
                component={'p'}
                fz={'xs'}
                ml={'10px'}
                radius={'sm'}
                size={'md'}
                variant={isDarkTheme ? 'filled' : 'light'}
              >
                {groupName ?? 'группа не указана'}
              </Badge>
            </Text>
          )}
        </Flex>
      </Card.Section>
    </Card>
  )
}
