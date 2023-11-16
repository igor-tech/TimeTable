import { FC, Fragment, memo, useEffect, useState } from 'react'

import { DayCard } from '@/components/Card/DayCard.tsx'
import { Theme } from '@/constants/Theme.tsx'
import { ICouple } from '@/types/types.ts'
import { Checkbox, Flex } from '@mantine/core'

type Props = {
  data: ICouple[][]
  isTeacher?: boolean
}
export const DaysCard: FC<Props> = memo(({ data, isTeacher }) => {
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

      <Flex gap={'20px'} justify={'center'} mt={'2px'} w={'100%'} wrap={'wrap'}>
        {data?.map((day, i) => {
          const currentDay = new Date().getDate()

          const isShow = hidePrevDay ? currentDay <= +day[0]?.numberDay.slice(0, 2).trim() : true

          return (
            <Fragment key={i}>{isShow && <DayCard day={day} isTeacher={isTeacher} />}</Fragment>
          )
        })}
      </Flex>
    </>
  )
})
