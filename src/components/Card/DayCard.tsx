import { FC } from 'react'

import { Couple } from '@/components/Card/Couple/Couple.tsx'
import { ICouple } from '@/types/types.ts'
import { Badge, Card, Flex, Group, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { TiPinOutline } from 'react-icons/ti'

type Props = {
  day: ICouple[]
  isTeacher?: boolean
}

export const DayCard: FC<Props> = ({ day, isTeacher }) => {
  const currentDay = new Date().getDate()

  const isToday = currentDay === +day[0]?.numberDay.slice(0, 2).trim()
  const matches = useMediaQuery('(min-width: 1000px)')

  return (
    <Card
      maw={matches ? 'var(--mantine-breakpoint-xs)' : '100%'}
      mt={'20px'}
      pb={'40px'}
      radius={'md'}
      shadow={'sm'}
      style={{ flex: '1 0 auto', boxShadow: 'var(--mantine-shadow-lg)' }}
      w={'450px'}
      withBorder
    >
      <Card.Section
        inheritPadding
        py={'xs'}
        style={{
          boxShadow: 'var(--mantine-shadow-xl)',
          borderRadius: '0 0 15px 15px',
        }}
        withBorder
      >
        <Group justify={'space-between'} mb={'xs'} mt={'md'}>
          <Text fw={500} fz={'lg'}>
            {day[0].dayOfTheWeek}, {day[0].numberDay}
          </Text>

          {isToday && (
            <Badge
              color={'green'}
              fz={'xs'}
              rightSection={<TiPinOutline size={22} />}
              size={'xl'}
              variant={'light'}
            >
              Сегодня
            </Badge>
          )}
        </Group>
      </Card.Section>

      <Card.Section inheritPadding p={'md'} py={'md'}>
        <Flex direction={'column'} gap={'10px'}>
          {day?.map((couple, i) => {
            return <Couple couple={couple} isTeacher={isTeacher} key={i} />
          })}
        </Flex>
      </Card.Section>
    </Card>
  )
}
