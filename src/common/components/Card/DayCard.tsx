import { FC } from 'react'

import { Couple } from '@/common/components/Card/Couple/Couple.tsx'
import { ColorScheme } from '@/common/constants/colorShceme.ts'
import { ICouple } from '@/common/types/types.ts'
import { Badge, Card, Flex, Group, Text, useMantineColorScheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { TiPinOutline } from 'react-icons/ti'

type Props = {
  day: ICouple[]
  isTeacher?: boolean
}

export const DayCard: FC<Props> = ({ day, isTeacher }) => {
  const { colorScheme } = useMantineColorScheme()

  const currentDay = new Date().getDate()

  const isToday = currentDay === +day[0]?.numberDay.trim().slice(0, 2)

  const matches = useMediaQuery('(min-width: 1000px)')

  return (
    <Card
      h={'100%'}
      maw={matches ? 'var(--mantine-breakpoint-xs)' : '100%'}
      mb={10}
      mt={10}
      pb={'40px'}
      pos={'relative'}
      radius={'xl'}
      shadow={'xl'}
      style={{ flex: '1 0 auto', overflow: 'visible', background: 'transparent' }}
      w={'450px'}
      withBorder
    >
      <Card.Section
        inheritPadding
        py={'xs'}
        style={{
          boxShadow:
            colorScheme === ColorScheme.Dark
              ? '2px 2px 6px 2px rgba(0, 0, 0, 0.2)'
              : 'var(--mantine-shadow-xl)',
          borderRadius: 'var(--mantine-radius-xl)',
          textAlign: 'center',
        }}
        withBorder
      >
        <Group align={'top'} justify={'space-between'} mb={'md'} mt={'sm'} pos={'relative'}>
          <Text fw={500} fz={'xl'}>
            {day[0].dayOfTheWeek}, {day[0].numberDay}
          </Text>

          {isToday && (
            <Badge
              color={'green'}
              fz={'sm'}
              p={20}
              pos={'absolute'}
              radius={'lg'}
              right={0}
              rightSection={<TiPinOutline size={28} />}
              size={'35'}
              top={0}
              variant={'light'}
            >
              Сегодня
            </Badge>
          )}
        </Group>
      </Card.Section>

      <Card.Section inheritPadding p={'md'} py={'md'}>
        <Flex direction={'column'} gap={'15px'}>
          {day?.map((couple, i) => {
            return <Couple couple={couple} isTeacher={isTeacher} key={i} />
          })}
        </Flex>
      </Card.Section>
    </Card>
  )
}
