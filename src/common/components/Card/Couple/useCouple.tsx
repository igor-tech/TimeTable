import { TIME_DATA } from '@/common/components/config.ts'
import { checkTimeInInterval } from '@/common/helpers/CheckTimeInInterval.ts'
import { ICouple, PracticeValues } from '@/common/types/types.ts'
import { CSSProperties, CardStylesNames } from '@mantine/core'

type Props = {
  couple: ICouple
}

type ReturnUseCouple = {
  isCurrentCouple: boolean
  isPractice: boolean
  isSession: boolean
  isToday: boolean
  style: Partial<Record<CardStylesNames, CSSProperties>>
  title: string
}

export const useCouple = ({ couple }: Props): ReturnUseCouple => {
  const { coupleNumber, numberDay } = couple

  const isPractice =
    couple.practiceType === PracticeValues.INTERNSHIP ||
    couple.practiceType === PracticeValues.EDUCATIONAL

  const currentDay = new Date().getDate()

  const isToday = currentDay === +numberDay.trim().slice(0, 2)

  const isCurrentCouple =
    checkTimeInInterval(
      isPractice ? '9:00' : TIME_DATA[coupleNumber][1],
      isPractice ? '14:00' : TIME_DATA[coupleNumber][2]
    ) && isToday

  const title = isPractice ? 'Практика' : `${coupleNumber} пара`

  const isSession = couple.practiceType === PracticeValues.SESSION

  const style = {
    section: isCurrentCouple ? { borderColor: 'var(--mantine-color-green-2)' } : {},
  }

  return { isCurrentCouple, isPractice, style, title, isSession, isToday }
}
