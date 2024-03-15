import { FC } from 'react'

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
    <Flex align={'center'} gap={20} justify={'space-between'} maw={'900px'}>
      {isStudent && (
        <MultiSelect
          checkIconPosition={'right'}
          clearable
          data={dataSelect ?? [defaultData]}
          maxDropdownHeight={rem(450)}
          maxValues={6}
          onChange={value => setSelectGroupId(value)}
          searchable={isSearchable}
          size={'lg'}
          styles={{
            wrapper: { boxShadow: 'var(--mantine-shadow-md)' },
            dropdown: { boxShadow: 'var(--mantine-shadow-xl)' },
            groupLabel: { fontSize: `${Theme.fontSizes.md}` },
            input: { fontSize: `${Theme.fontSizes.lg}` },
            label: { fontSize: `${Theme.fontSizes.lg}` },
            option: { fontSize: `${Theme.fontSizes.lg}`, marginLeft: '5px' },
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
          size={'lg'}
          styles={{
            wrapper: { boxShadow: 'var(--mantine-shadow-sm)' },
            dropdown: { boxShadow: 'var(--mantine-shadow-xl)' },
            groupLabel: { fontSize: `${Theme.fontSizes.md}` },
            input: { fontSize: `${Theme.fontSizes.lg}` },
            label: { fontSize: `${Theme.fontSizes.lg}` },
            option: { fontSize: `${Theme.fontSizes.lg}`, marginLeft: '5px' },
          }}
          value={value}
          w={'100%'}
          {...rest}
        />
      )}
    </Flex>
  )
}
