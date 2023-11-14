import { FC } from 'react'

import { Couple } from '@/components/Couple.tsx'
import { ICouple } from '@/types/types.ts'
import { Badge, Card, Group, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

type Props = {
  day: ICouple[]
  isTeacher?: boolean
}

export const DayCard: FC<Props> = ({ day, isTeacher }) => {
  const currentDay = new Date().getDate()

  const isToday = currentDay === +day[0]?.numberDay.slice(0, 2).trim()
  const matches = useMediaQuery('(min-width: 1400px)')

  return (
    <Card
      maw={matches ? '50%' : '100%'}
      mt={'20px'}
      radius={'md'}
      shadow={'sm'}
      style={{ flex: '1 0 auto' }}
      w={'700px'}
      withBorder
    >
      <Group justify={'space-between'} mb={'xs'} mt={'md'}>
        <Text fw={500} fz={'lg'}>
          {day[0].dayOfTheWeek}, {day[0].numberDay}
        </Text>

        {isToday && (
          <Badge color={'green'} fz={'xs'} variant={'light'}>
            Сегодня
          </Badge>
        )}
      </Group>

      {day?.map((couple, i) => <Couple couple={couple} isTeacher={isTeacher} key={i} />)}
    </Card>
  )
}
