import { FC } from 'react'

import { ClassRoomHoursModal } from '@/components/modal/ClassRoomHoursModal/ClassRoomHoursModal.tsx'
import { ActionIcon, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { FiAlertCircle } from 'react-icons/fi'

import styles from './StudyTimeButton.module.css'

export const StudyTimeButton: FC = () => {
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
    <Tooltip color={'blue'} label={'Время занятий'}>
      <ActionIcon m={0} onClick={openClassroomHoursModal} p={0} size={35} variant={'light'}>
        <FiAlertCircle size={20} />
      </ActionIcon>
    </Tooltip>
  )
}
