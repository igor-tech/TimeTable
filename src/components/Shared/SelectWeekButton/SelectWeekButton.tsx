import { FC } from 'react'

import { ModalDatePicker } from '@/components/modal/ModalDatePicker.tsx'
import { hasWeekPassed } from '@/helpers/HasWeekPassed.tsx'
import { useTimeTable } from '@/store/store.ts'
import { ActionIcon, Indicator, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { CiCalendarDate } from 'react-icons/ci'

export const SelectWeekButton: FC = () => {
  const { firstDayOfWeek } = useTimeTable()
  const openDateModal = () =>
    modals.open({
      children: <ModalDatePicker />,
      title: 'Выберите неделю',
      modalId: 'setWeekModal',
    })

  const isOnIndicator = hasWeekPassed(firstDayOfWeek)

  return (
    <Tooltip label={'Выбрать неделю'}>
      <Indicator disabled={isOnIndicator} position={'top-end'} processing>
        <ActionIcon onClick={openDateModal} size={44} variant={'light'}>
          <CiCalendarDate size={30} />
        </ActionIcon>
      </Indicator>
    </Tooltip>
  )
}
