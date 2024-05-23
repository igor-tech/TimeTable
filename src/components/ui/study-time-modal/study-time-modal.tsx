import { ClassRoomHoursModal } from '@/components/modals/class-room-hours-modal'
import { ActionIcon, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IoTimeOutline } from 'react-icons/io5'

import styles from './study-time-modal.module.css'

export const StudyTimeModal = () => {
  const openClassroomHoursModal = () =>
    modals.open({
      children: <ClassRoomHoursModal />,
      classNames: { root: styles.root, title: styles.title },
      size: '800px',
      styles: {
        root: { scrollbarGutter: 'unset', overflow: 'hidden' },
        title: { fontSize: 'var(--mantine-font-size-lg)', fontWeight: '700', textAlign: 'center' },
      },
      title: 'Время проведения аудиторных занятий',
    })

  return (
    <Tooltip label={'Время занятий'}>
      <ActionIcon
        area-label={'Время занятий'}
        onClick={openClassroomHoursModal}
        size={44}
        variant={'light'}
      >
        <IoTimeOutline size={26} />
      </ActionIcon>
    </Tooltip>
  )
}
