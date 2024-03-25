import { FC } from 'react'

import { CLASS_ROOM_HOURS_DATA } from '@/common/components/config.ts'
import { CSSProperties, Table } from '@mantine/core'

import styles from './ClassRoomHoursModal.module.css'

export const ClassRoomHoursModal: FC = () => {
  const TheadStyles = {
    th: { fontSize: 'var(--mantine-font-size-lg)', textAlign: 'center', whiteSpace: 'nowrap' },
  } as Partial<Record<'th', CSSProperties>>

  return (
    <>
      <Table
        classNames={{ td: styles.td, thead: styles.thead }}
        horizontalSpacing={'lg'}
        verticalSpacing={'lg'}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th styles={TheadStyles}>1 занятие</Table.Th>
            <Table.Th styles={TheadStyles}>2 занятие</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {CLASS_ROOM_HOURS_DATA.map(element => (
            <Table.Tr key={element.lesson}>
              <Table.Td>{element.lesson}</Table.Td>
              <Table.Td>{element.start}</Table.Td>
              <Table.Td>{element.end}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  )
}
