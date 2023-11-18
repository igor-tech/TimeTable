import { FC } from 'react'

import { TIME_DATA, currentCouple, nextCouple } from '@/components/config.ts'
import { isOneHourBefore } from '@/helpers/IsOneHourBefore.tsx'
import { randomInteger } from '@/helpers/RandomInteger.tsx'
import { ICouple, PracticeValues } from '@/types/types.ts'
import { Badge } from '@mantine/core'

type Props = {
  couple: ICouple
  isCurrentCouple: boolean
}
export const StatusCouple: FC<Props> = ({ couple, isCurrentCouple }) => {
  const { coupleNumber, numberDay } = couple

  const currentDay = new Date().getDate()

  const isToday = currentDay === +numberDay.slice(0, 2).trim()

  const isPractice =
    couple.practiceType === PracticeValues.INTERNSHIP ||
    couple.practiceType === PracticeValues.EDUCATIONAL

  const randomIndex = randomInteger(3)

  const isNextCouple =
    isOneHourBefore(isPractice ? '9:00' : TIME_DATA[coupleNumber][1]) && !isCurrentCouple && isToday

  return (
    <>
      {isCurrentCouple && (
        <Badge color={'green'} fz={'xs'} radius={'xs'} size={'md'} variant={'light'}>
          {currentCouple[randomIndex]}
        </Badge>
      )}

      {isNextCouple && (
        <Badge color={'orange'} fz={'xs'} ml={'10px'} radius={'lg'} size={'md'} variant={'light'}>
          {nextCouple[randomIndex]}
        </Badge>
      )}
    </>
  )
}
