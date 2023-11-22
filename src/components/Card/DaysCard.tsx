import { FC, Fragment, memo, useEffect, useState } from 'react'

import { DayCard } from '@/components/Card/DayCard.tsx'
import { Theme } from '@/constants/Theme.tsx'
import { ICouple } from '@/types/types.ts'
import { Checkbox, Flex, Text } from '@mantine/core'

type Props = {
  data: ICouple[][]
  groupId?: string
  isTeacher?: boolean
}
export const DaysCard: FC<Props> = memo(({ data, groupId, isTeacher }) => {
  const [hidePrevDay, setHidePrevDay] = useState<boolean>(true)
  const [isAnyDayHidden, setIsAnyDayHidden] = useState<boolean>(false)

  useEffect(() => {
    setIsAnyDayHidden(
      data?.some(day => {
        const currentDay = new Date().getDate()
        const isShow = currentDay <= +day[0]?.numberDay.slice(0, 2).trim()

        return !isShow
      })
    )
  }, [data, hidePrevDay])

  const areAllDaysHidden =
    isAnyDayHidden &&
    data?.every(day => {
      const currentDay = new Date().getDate()
      const isShow = hidePrevDay ? currentDay <= +day[0]?.numberDay.slice(0, 2).trim() : true

      return !isShow
    })

  return (
    <>
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
          const currentDay = new Date().getDate()

          const isShow = hidePrevDay ? currentDay <= +day[0]?.numberDay.slice(0, 2).trim() : true

          return (
            <Fragment key={i}>
              {isShow && <DayCard day={day} groupId={groupId} isTeacher={isTeacher} />}
            </Fragment>
          )
        })}
      </Flex>
    </>
  )
})
