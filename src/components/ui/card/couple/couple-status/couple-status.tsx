import { TIME_DATA, currentCouple, nextCouple } from '@/common/constants/config'
import { ICouple, PracticeValues } from '@/common/types'
import { isOneHourAndHalfBefore } from '@/common/utils/IsOneHourAndHalfBefore'
import { randomInteger } from '@/common/utils/RandomInteger'
import { Badge, Box } from '@mantine/core'

import styles from './couple-status.module.css'

type Props = {
  couple: ICouple
  isCurrentCouple: boolean
}
export const StatusCouple = ({ couple, isCurrentCouple }: Props) => {
  const { coupleNumber, numberDay } = couple

  const currentDay = new Date().getDate()

  const isToday = currentDay === +numberDay.trim().slice(0, 2)

  const isPractice =
    couple.practiceType === PracticeValues.INTERNSHIP ||
    couple.practiceType === PracticeValues.EDUCATIONAL

  const randomIndex = randomInteger(2)

  const isNextCouple =
    isOneHourAndHalfBefore(isPractice ? '9:00' : TIME_DATA[coupleNumber][1]) &&
    !isCurrentCouple &&
    isToday

  return (
    <Box pos={'relative'}>
      {isCurrentCouple && (
        <Badge className={styles.badge} color={'green'} size={'lg'} variant={'light'}>
          {currentCouple[randomIndex]}
        </Badge>
      )}

      {isNextCouple && (
        <Badge className={styles.badge} color={'orange'} size={'md'} variant={'light'}>
          {nextCouple[randomIndex]}
        </Badge>
      )}
    </Box>
  )
}
