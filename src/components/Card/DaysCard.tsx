import { FC, Fragment, useEffect, useState } from 'react'

import { DayCard } from '@/components/Card/DayCard.tsx'
import { TIME_DATA } from '@/components/config.ts'
import { Theme } from '@/constants/Theme.tsx'
import { convertStringToDate } from '@/helpers/ConvertStringToDate.tsx'
import { hasWeekPassed } from '@/helpers/HasWeekPassed.tsx'
import { ICouple } from '@/types/types.ts'
import { Box, Checkbox, Flex, Text } from '@mantine/core'

type Props = {
  data: ICouple[][]
  isTeacher?: boolean
}
export const DaysCard: FC<Props> = ({ data, isTeacher }) => {
  const [hidePrevDay, setHidePrevDay] = useState<boolean>(true)
  const [isAnyDayHidden, setIsAnyDayHidden] = useState<boolean>(false)

  const currentDay = new Date().getTime()

  const shouldShowDay = (day: ICouple[]): boolean => {
    const isWeekPassed = !hasWeekPassed(convertStringToDate(day[0]?.numberDay))
    const lastCoupleHours = 3 + parseInt(TIME_DATA[day.length][2].slice(0, 2))

    const isShow = hidePrevDay
      ? currentDay <= convertStringToDate(day[0]?.numberDay, lastCoupleHours).getTime()
      : true

    return isWeekPassed || isShow
  }

  useEffect(() => {
    setIsAnyDayHidden(
      data?.some(day => {
        const lastCoupleHours = 3 + parseInt(TIME_DATA[day.length][2].slice(0, 2))
        const isShow =
          currentDay <= convertStringToDate(day[0]?.numberDay, lastCoupleHours).getTime()
        const isWeekPassed = !hasWeekPassed(convertStringToDate(day[0]?.numberDay))

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
        <Checkbox
          defaultChecked
          label={'Спрятать прошедшие дни'}
          mt={'10px'}
          onClick={() => setHidePrevDay(!hidePrevDay)}
          styles={{ label: { fontSize: `${Theme.fontSizes.md}` } }}
        />
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
