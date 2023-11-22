import { FC } from 'react'

import { ModalDatePicker } from '@/components/modal/ModalDatePicker.tsx'
import { isDayInCurrentWeek } from '@/helpers/IsDayInCurrentWeek.tsx'
import { ActionIcon, Indicator, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { CiCalendarDate } from 'react-icons/ci'

type Props = {
  firstDayOfTheWeek: Date
  onChangeDate: (date: Date) => void
}

export const SelectWeekButton: FC<Props> = ({ firstDayOfTheWeek, onChangeDate }) => {
  const openDateModal = () =>
    modals.open({
      children: (
        <ModalDatePicker firstDayOfTheWeek={firstDayOfTheWeek} onChangeDate={onChangeDate} />
      ),
      title: 'Выберите неделю',
    })

  const isOnIndicator = isDayInCurrentWeek(firstDayOfTheWeek)

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
