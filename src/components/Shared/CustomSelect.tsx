import { FC } from 'react'

import { SelectWeekButton } from '@/components/Shared/SelectWeekButton/SelectWeekButton.tsx'
import { StudyTimeButton } from '@/components/Shared/StudyTimeButton/StudyTimeButton.tsx'
import { DEFAULT_GROUP_ID, DEFAULT_TEACHER_ID } from '@/components/config.ts'
import { Theme } from '@/constants/Theme.tsx'
import { getGroupNameDataSelect } from '@/helpers/getGroupNameDataSelect.ts'
import { isMobileDeviceByWidth } from '@/helpers/isMobileDevice.ts'
import { Flex, Select, rem } from '@mantine/core'

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

      <SelectWeekButton firstDayOfTheWeek={firstDayOfTheWeek} onChangeDate={onChangeDate} />

      <StudyTimeButton />
    </Flex>
  )
}