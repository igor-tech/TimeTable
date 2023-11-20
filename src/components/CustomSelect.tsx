import { FC } from 'react'

import { DEFAULT_GROUP_ID, DEFAULT_TEACHER_ID } from '@/components/config.ts'
import { ModalDatePicker } from '@/components/modal/ModalDatePicker.tsx'
import { Theme } from '@/constants/Theme.tsx'
import { isDayInCurrentWeek } from '@/helpers/IsDayInCurrentWeek.tsx'
import { getGroupNameDataSelect } from '@/helpers/getGroupNameDataSelect.ts'
import { isMobileDeviceByWidth } from '@/helpers/isMobileDevice.ts'
import { ActionIcon, Flex, Indicator, Select, rem } from '@mantine/core'
import { modals } from '@mantine/modals'
import { CiCalendarDate } from 'react-icons/ci'

type CustomSelectProps = {
  data: string[]
  defaultData: string
  firstDayOfTheWeek: Date
  label: string
  onChangeDate: (date: Date) => void
  onChangeSelect: (groupId: string) => void
  placeholder: string
  value: string
}
export const CustomSelect: FC<CustomSelectProps> = ({
  data,
  defaultData,
  firstDayOfTheWeek,
  onChangeDate,
  onChangeSelect,
  ...rest
}) => {
  const openModal = () =>
    modals.open({
      children: (
        <ModalDatePicker firstDayOfTheWeek={firstDayOfTheWeek} onChangeDate={onChangeDate} />
      ),
      title: 'Выберите неделю',
    })

  const isOnIndicator = !isDayInCurrentWeek(firstDayOfTheWeek)

  const isSearchable = defaultData === DEFAULT_TEACHER_ID && !isMobileDeviceByWidth()

  const isStudent = defaultData === DEFAULT_GROUP_ID

  const dataSelect = isStudent ? getGroupNameDataSelect(data) : data

  return (
    <Flex align={'end'} gap={20} justify={'space-between'} maw={'700px'}>
      <Select
        checkIconPosition={'right'}
        data={dataSelect ?? [defaultData]}
        maxDropdownHeight={rem(450)}
        onChange={value => onChangeSelect(value!)}
        searchable={isSearchable}
        styles={{
          dropdown: { boxShadow: '4px 4px 4px var(--mantine-color-gray-4)' },
          groupLabel: { fontSize: `${Theme.fontSizes.md}` },
          input: { fontSize: `${Theme.fontSizes.md}` },
          label: { fontSize: `${Theme.fontSizes.md}` },
          option: { fontSize: `${Theme.fontSizes.md}`, marginLeft: '5px' },
        }}
        w={'100%'}
        {...rest}
      />
      <Indicator disabled={isOnIndicator} h={'36px'} position={'top-end'} w={'36px'}>
        <ActionIcon m={0} onClick={openModal} p={0} size={35} variant={'light'}>
          <CiCalendarDate size={35} />
        </ActionIcon>
      </Indicator>
    </Flex>
  )
}
