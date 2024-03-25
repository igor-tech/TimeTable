import { FC, Fragment, useEffect, useState } from 'react'

import { DayCard } from '@/common/components/Card/DayCard.tsx'
import { THIRTY_MINUTES } from '@/common/components/config.ts'
import { Theme } from '@/common/constants/theme.ts'
import { hasWeekPassed } from '@/common/helpers/HasWeekPassed.ts'
import { ICouple } from '@/common/types/types.ts'
import { Box, Chip, Flex, Text } from '@mantine/core'

type Props = {
  data: ICouple[][]
  isTeacher?: boolean
}

export const DaysCard: FC<Props> = ({ data, isTeacher }) => {
  const [hidePrevDay, setHidePrevDay] = useState<boolean>(true)
  const [isAnyDayHidden, setIsAnyDayHidden] = useState<boolean>(false)

  const currentDay = Date.now()

  const shouldShowDay = (day: ICouple[]): boolean => {
    const isWeekPassed = !hasWeekPassed(day[day.length - 1].endTime)

    const isShow = hidePrevDay ? currentDay <= day[day.length - 1].endTime + THIRTY_MINUTES : true

    return isWeekPassed || isShow
  }

  useEffect(() => {
    setIsAnyDayHidden(
      data?.some(day => {
        const isShow = currentDay <= day[day.length - 1].endTime + THIRTY_MINUTES
        const isWeekPassed = !hasWeekPassed(day[day.length - 1].endTime)

        return !isShow && !isWeekPassed
      })
    )
  }, [data, hidePrevDay])

  const areAllDaysHidden = data?.every(day => {
    return !shouldShowDay(day)
  })

  return (
    <Box>
      {isAnyDayHidden && (
        <Chip
          color={'green'}
          defaultChecked
          mt={'20px'}
          onClick={() => setHidePrevDay(!hidePrevDay)}
          radius={'md'}
          size={'md'}
          styles={{ label: { fontSize: `${Theme.fontSizes.md}` } }}
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

      <Flex gap={'20px'} justify={'flex-start'} mt={'2px'} w={'100%'} wrap={'wrap'}>
        {data?.map((day, i) => {
          const isShow = shouldShowDay(day)

          return (
            <Fragment key={i}>{isShow && <DayCard day={day} isTeacher={isTeacher} />}</Fragment>
          )
        })}
      </Flex>
    </Box>
  )
}
