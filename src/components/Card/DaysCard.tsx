import { FC, Fragment, useState } from 'react'

import { DayCard } from '@/components/Card/DayCard.tsx'
import { ICouple } from '@/types/types.ts'
import { Checkbox, Flex } from '@mantine/core'

type Props = {
  data: ICouple[][]
}
export const DaysCard: FC<Props> = ({ data }) => {
  const [hidePrevDay, setHidePrevDay] = useState<boolean>(true)

  return (
    <>
      <Checkbox
        defaultChecked
        label={'Спрятать прошедшие дни'}
        mt={'10px'}
        onClick={() => setHidePrevDay(!hidePrevDay)}
      />

      <Flex gap={'20px'} justify={'center'} mt={'2px'} w={'100%'} wrap={'wrap'}>
        {data?.map((day, i) => {
          const currentDay = new Date().getDate()

          const isShow = hidePrevDay ? currentDay <= +day[0]?.numberDay.slice(0, 2).trim() : true

          return <Fragment key={i}>{isShow && <DayCard day={day} />}</Fragment>
        })}
      </Flex>
    </>
  )
}
