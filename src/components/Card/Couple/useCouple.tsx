import { TIME_DATA } from '@/components/config.ts'
import { ColorScheme } from '@/constants/colorShceme.ts'
import { checkTimeInInterval } from '@/helpers/CheckTimeInInterval.tsx'
import { ICouple, PracticeValues } from '@/types/types.ts'
import { CSSProperties, CardStylesNames, useMantineColorScheme } from '@mantine/core'

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
  const { colorScheme } = useMantineColorScheme()

  const isDark = colorScheme === ColorScheme.Dark
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
    root: isCurrentCouple
      ? {
          transform: 'scale(1.03, 1.13) translateY(13px)',
          zIndex: '1',
          boxShadow: isDark ? '2px 2px 4px 2px rgba(0, 0, 0, 0.3)' : 'var(--mantine-shadow-xl)',
        }
      : {},
    section: isCurrentCouple ? { borderColor: 'var(--mantine-color-green-2)' } : {},
  }

  return { isCurrentCouple, isPractice, style, title, isSession, isToday }
}
