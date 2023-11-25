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

  const isOnIndicator = hasWeekPassed(new Date(firstDayOfWeek))

  return (
    <Indicator
      disabled={isOnIndicator}
      h={'36px'}
      position={'top-end'}
      processing
      w={'36px'}
      withBorder
    >
      <Tooltip color={'blue'} label={'Выбрать неделю'}>
        <ActionIcon m={0} onClick={openDateModal} p={0} size={35} variant={'light'}>
          <CiCalendarDate size={35} />
        </ActionIcon>
      </Tooltip>
    </Indicator>
  )
}
