import { FC } from 'react'

import { ModalDatePicker } from '@/components/modals/data-picker-modal'
import { ActionIcon, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { CiCalendarDate } from 'react-icons/ci'

export const SelectWeekButton: FC = () => {
  const openDateModal = () =>
    modals.open({
      children: <ModalDatePicker />,
      title: 'Выберите неделю',
      modalId: 'setWeekModal',
    })

  return (
    <Tooltip label={'Выбрать неделю'}>
      <ActionIcon area-label={'Выбор недели'} onClick={openDateModal} size={44} variant={'light'}>
        <CiCalendarDate size={30} />
      </ActionIcon>
    </Tooltip>
  )
}
