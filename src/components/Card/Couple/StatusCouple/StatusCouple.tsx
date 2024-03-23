import { FC } from 'react'

import { TIME_DATA, currentCouple, nextCouple } from '@/components/config.ts'
import { isOneHourAndHalfBefore } from '@/helpers/IsOneHourAndHalfBefore.tsx'
import { randomInteger } from '@/helpers/RandomInteger.tsx'
import { ICouple, PracticeValues } from '@/types/types.ts'
import { Badge, Box } from '@mantine/core'

type Props = {
  couple: ICouple
  isCurrentCouple: boolean
}
export const StatusCouple: FC<Props> = ({ couple, isCurrentCouple }) => {
  const { coupleNumber, numberDay } = couple

  const currentDay = new Date().getDate()

  const isToday = currentDay === +numberDay.trim().slice(0, 2)

  const isPractice =
    couple.practiceType === PracticeValues.INTERNSHIP ||
    couple.practiceType === PracticeValues.EDUCATIONAL

  const randomIndex = randomInteger(3)

  const isNextCouple =
    isOneHourAndHalfBefore(isPractice ? '9:00' : TIME_DATA[coupleNumber][1]) &&
    !isCurrentCouple &&
    isToday

  return (
    <Box pos={'relative'}>
      {isCurrentCouple && (
        <Badge
          color={'green'}
          fz={'xs'}
          left={'50%'}
          pos={'absolute'}
          radius={'md'}
          size={'lg'}
          style={{ transform: 'translate(-50%, -50%)' }}
          top={'50%'}
          variant={'light'}
        >
          {currentCouple[randomIndex]}
        </Badge>
      )}

      {isNextCouple && (
        <Badge color={'orange'} fz={'xs'} ml={'10px'} radius={'md'} size={'md'} variant={'light'}>
          {nextCouple[randomIndex]}
        </Badge>
      )}
    </Box>
  )
}
