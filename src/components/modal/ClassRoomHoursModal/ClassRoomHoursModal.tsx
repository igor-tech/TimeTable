import { FC } from 'react'

import { CLASS_ROOM_HOURS_DATA } from '@/components/config.ts'
import { Table } from '@mantine/core'

import styles from './ClassRoomHoursModal.module.css'

export const ClassRoomHoursModal: FC = () => {
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
            <Table.Th styles={{ th: { textAlign: 'center' } }}>1 занятие</Table.Th>
            <Table.Th styles={{ th: { textAlign: 'center' } }}>2 занятие</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody mt={'80px'}>
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
