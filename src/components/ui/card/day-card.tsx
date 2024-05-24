import { FC, memo } from 'react'

import { ColorScheme } from '@/common/constants/color-scheme'
import { ICouple } from '@/common/types'
import { Couple } from '@/components/ui/card/couple/couple'
import { Badge, Card, Flex, Group, Text, useMantineColorScheme } from '@mantine/core'
import { TiPinOutline } from 'react-icons/ti'

type Props = {
  day: ICouple[]
  isTeacher?: boolean
}

export const DayCard: FC<Props> = memo(({ day, isTeacher }) => {
  const { colorScheme } = useMantineColorScheme()

  const currentDay = new Date().getDate()

  const isToday = currentDay === +day[0]?.numberDay.trim().slice(0, 2)

  const boxShadow =
    colorScheme === ColorScheme.Dark
      ? '2px 2px 6px 2px rgba(0, 0, 0, 0.2)'
      : 'var(--mantine-shadow-xl)'

  return (
    <Card
      mb={40}
      mt={10}
      pb={'40px'}
      pos={'relative'}
      radius={'xl'}
      shadow={'xl'}
      style={{ flex: '1 1 auto', overflow: 'visible', background: 'transparent' }}
      w={'100%'}
      withBorder
    >
      <Card.Section
        inheritPadding
        py={'xs'}
        style={{
          boxShadow: boxShadow,
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
        <Flex direction={'column'} gap={'20px'}>
          {day?.map((couple, i) => {
            return <Couple couple={couple} isTeacher={isTeacher} key={i} />
          })}
        </Flex>
      </Card.Section>
    </Card>
  )
})
