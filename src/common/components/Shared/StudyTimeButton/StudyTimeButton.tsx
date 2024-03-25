import { FC } from 'react'

import { ClassRoomHoursModal } from '@/common/components/modal/ClassRoomHoursModal/ClassRoomHoursModal.tsx'
import { ActionIcon, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IoTimeOutline } from 'react-icons/io5'

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
    <Tooltip label={'Время занятий'}>
      <ActionIcon onClick={openClassroomHoursModal} size={44} variant={'light'}>
        <IoTimeOutline size={26} />
      </ActionIcon>
    </Tooltip>
  )
}
