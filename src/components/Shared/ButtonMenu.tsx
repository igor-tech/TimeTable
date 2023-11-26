import { FC } from 'react'

import { SelectWeekButton } from '@/components/Shared/SelectWeekButton/SelectWeekButton.tsx'
import { StudyTimeButton } from '@/components/Shared/StudyTimeButton/StudyTimeButton.tsx'
import { DEFAULT_GROUP_ID, DEFAULT_TEACHER_ID } from '@/components/config.ts'
import { Theme } from '@/constants/Theme.tsx'
import { getGroupNameDataSelect } from '@/helpers/getGroupNameDataSelect.ts'
import { isMobileDeviceByWidth } from '@/helpers/isMobileDevice.ts'
import { useTimeTable } from '@/store/store.ts'
import { Flex, MultiSelect, Select, rem } from '@mantine/core'

type CustomSelectProps = {
  data: string[]
  defaultData: string
  label: string
  onChangeSelect: (groupId: string) => void
  placeholder: string
  value: string
}
export const ButtonMenu: FC<CustomSelectProps> = ({
  data,
  defaultData,
  onChangeSelect,
  value,
  ...rest
}) => {
  const { setSelectGroupId, groupId } = useTimeTable()
  const isSearchable = defaultData === DEFAULT_TEACHER_ID && !isMobileDeviceByWidth()

  const isStudent = defaultData === DEFAULT_GROUP_ID

  const dataSelect = isStudent ? getGroupNameDataSelect(data) : data

  return (
    <Flex align={'end'} gap={20} justify={'space-between'} maw={'700px'}>
      {isStudent && (
        <MultiSelect
          checkIconPosition={'right'}
          clearable
          data={dataSelect ?? [defaultData]}
          maxDropdownHeight={rem(450)}
          maxValues={4}
          onChange={value => setSelectGroupId(value)}
          searchable={isSearchable}
          styles={{
            dropdown: { boxShadow: '4px 4px 4px var(--mantine-color-gray-4)' },
            groupLabel: { fontSize: `${Theme.fontSizes.md}` },
            input: { fontSize: `${Theme.fontSizes.md}` },
            label: { fontSize: `${Theme.fontSizes.md}` },
            option: { fontSize: `${Theme.fontSizes.md}`, marginLeft: '5px' },
          }}
          value={groupId}
          w={'100%'}
          {...rest}
        />
      )}

      {!isStudent && (
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
          value={value}
          w={'100%'}
          {...rest}
        />
      )}

      <SelectWeekButton />

      <StudyTimeButton />
    </Flex>
  )
}
