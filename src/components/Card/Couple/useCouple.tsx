import { TIME_DATA } from '@/components/config.ts'
import { checkTimeInInterval } from '@/helpers/CheckTimeInInterval.tsx'
import { ICouple, PracticeValues } from '@/types/types.ts'
import { CSSProperties, CardStylesNames } from '@mantine/core'

type Props = {
  couple: ICouple
}

type ReturnUseCouple = {
  isCurrentCouple: boolean
  isPractice: boolean
  styles: Partial<Record<CardStylesNames, CSSProperties>>
  title: string
}

export const useCouple = ({ couple }: Props): ReturnUseCouple => {
  const { coupleNumber, numberDay } = couple

  const isPractice =
    couple.practiceType === PracticeValues.INTERNSHIP ||
    couple.practiceType === PracticeValues.EDUCATIONAL

  const currentDay = new Date().getDate()

  const isToday = currentDay === +numberDay.slice(0, 2).trim()

  const isCurrentCouple =
    checkTimeInInterval(
      isPractice ? '9:00' : TIME_DATA[coupleNumber][1],
      isPractice ? '14:00' : TIME_DATA[coupleNumber][2]
    ) && isToday

  const title = isPractice ? 'Практика' : `${coupleNumber} пара`

  const styles = {
    root: isCurrentCouple
      ? {
          transform: 'scale(1.03, 1.1) translateY(10px)',
          zIndex: '1',
        }
      : {},
    section: isCurrentCouple ? { borderColor: 'var(--mantine-color-green-2)' } : {},
  }

  return { isCurrentCouple, isPractice, styles, title }
}
