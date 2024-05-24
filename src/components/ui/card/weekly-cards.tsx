import { Fragment, memo, useEffect, useState } from 'react'

import { SIXTY_MINUTES } from '@/common/constants/config'
import { Theme } from '@/common/constants/theme'
import { ICouple } from '@/common/types'
import { hasWeekPassed } from '@/common/utils/HasWeekPassed'
import { DayCard } from '@/components/ui/card/day-card'
import { Box, Chip, Flex, Grid, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

type Props = {
  data: ICouple[][]
  isTeacher?: boolean
}

export const WeeklyCards = memo(({ data, isTeacher }: Props) => {
  const [hidePrevDay, setHidePrevDay] = useState<boolean>(true)
  const [isAnyDayHidden, setIsAnyDayHidden] = useState<boolean>(false)

  const currentDay = Date.now()

  const tablet = useMediaQuery('(max-width: 1400px)')
  const mobile = useMediaQuery('(max-width: 1000px)')

  const columnsCount = (mobile && 1) || (tablet && 2) || 3

  const shouldShowDay = (day: ICouple[]): boolean => {
    const isWeekPassed = !hasWeekPassed(day[day.length - 1].endTime)

    const isShow = hidePrevDay ? currentDay <= day[day.length - 1].endTime + SIXTY_MINUTES : true

    return isWeekPassed || isShow
  }

  useEffect(() => {
    setIsAnyDayHidden(
      data?.some(day => {
        const isShow = currentDay <= day[day.length - 1].endTime + SIXTY_MINUTES
        const isWeekPassed = !hasWeekPassed(day[day.length - 1].endTime)

        return !isShow && !isWeekPassed
      })
    )
  }, [data, hidePrevDay])

  const areAllDaysHidden = data?.every(day => {
    return !shouldShowDay(day)
  })

  return (
    <Box h={'100%'} pb={30} pl={'.2rem'} pos={'relative'} pr={'.2rem'} pt={'40px'}>
      {isAnyDayHidden && (
        <Chip
          color={'green'}
          defaultChecked
          onClick={() => setHidePrevDay(!hidePrevDay)}
          pos={'absolute'}
          radius={'md'}
          size={'md'}
          styles={{ label: { fontSize: `${Theme.fontSizes.md}` } }}
          top={0}
          variant={'light'}
        >
          Спрятать прошедшие дни
        </Chip>
      )}

      {areAllDaysHidden && (
        <Flex justify={'center'} pt={'calc(100vh / 5)'}>
          <Text fw={'400'} fz={'lg'}>
            Нет отображаемых дней
          </Text>
        </Flex>
      )}

      <Grid columns={columnsCount} gutter={'lg'} justify={'flex-start'} pb={2} pt={2} w={'100%'}>
        {data?.map((day, i) => {
          const isShow = shouldShowDay(day)

          return (
            <Fragment key={i}>
              {isShow && (
                <Grid.Col span={1}>
                  <DayCard day={day} isTeacher={isTeacher} />
                </Grid.Col>
              )}
            </Fragment>
          )
        })}
      </Grid>
    </Box>
  )
})
