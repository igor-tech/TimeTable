import { useEffect, useState } from 'react'

import { useTimeTable } from '@/app/store/store.ts'
import { getFirstDayOfTheWeek } from '@/common/helpers/getFirstDayOfTheWeek.ts'
import { Flex } from '@mantine/core'
import { Calendar } from '@mantine/dates'
import { modals } from '@mantine/modals'
import dayjs from 'dayjs'

export const ModalDatePicker = () => {
  const { firstDayOfWeek, setFirstDayOfWeek } = useTimeTable()
  const [hovered, setHovered] = useState<Date | null>(null)
  const [value, setValue] = useState<Date | null>(null)
  const [startWeek, setStartWeek] = useState<Date | null>(null)

  function getDay(date: Date) {
    const day = date.getDay()

    return day === 0 ? 6 : day - 1
  }

  function startOfWeek(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - getDay(date) - 1)
  }

  function endOfWeek(date: Date) {
    return dayjs(new Date(date.getFullYear(), date.getMonth(), date.getDate() + (6 - getDay(date))))
      .endOf('date')
      .toDate()
  }

  function isInWeekRange(date: Date, value: Date | null) {
    return value
      ? dayjs(date).isBefore(endOfWeek(value)) && dayjs(date).isAfter(startOfWeek(value))
      : false
  }

  useEffect(() => {
    setValue(new Date(firstDayOfWeek))
  }, [firstDayOfWeek])

  useEffect(() => {
    if (startWeek !== null) {
      setFirstDayOfWeek(startWeek)

      modals.close('setWeekModal')
    }
  }, [setFirstDayOfWeek, startWeek])

  return (
    <Flex justify={'center'}>
      <Calendar
        getDayProps={date => {
          const isHovered = isInWeekRange(date, hovered)
          const isSelected = isInWeekRange(date, value)
          const isInRange = isHovered || isSelected

          return {
            firstInRange: isInRange && date.getDay() === 1,
            inRange: isInRange,
            lastInRange: isInRange && date.getDay() === 0,
            onClick: () => {
              setValue(date)
              setStartWeek(getFirstDayOfTheWeek(date))
            },
            onMouseEnter: () => setHovered(date),
            onMouseLeave: () => setHovered(null),
            selected: isSelected,
          }
        }}
        size={'lg'}
        withCellSpacing
      />
    </Flex>
  )
}
