import { FC } from 'react'

import { Couple } from '@/components/Couple'
import { ICouple } from '@/types/types'
import { Badge, Card, Group, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

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
      maw={matches ? '50%' : '100%'}
      mt={'20px'}
      radius={'md'}
      shadow={'sm'}
      style={{ flex: '1 0 auto' }}
      w={'500px'}
      withBorder
    >
      <Group justify={'space-between'} mb={'xs'} mt={'md'}>
        <Text fw={500}>
          {day[0].dayOfTheWeek}, {day[0].numberDay}
        </Text>

        {isToday && (
          <Badge color={'green'} variant={'light'}>
            Сегодня
          </Badge>
        )}
      </Group>

      {day?.map((couple, i) => <Couple couple={couple} isTeacher={isTeacher} key={i} />)}
    </Card>
  )
}
