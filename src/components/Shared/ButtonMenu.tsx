import { FC } from 'react'

import { AnimatedIcon } from '@/components/Shared/IconComponent/AnimatedIcon.tsx'
import { DEFAULT_GROUP_ID } from '@/components/config.ts'
import { Theme } from '@/constants/Theme.tsx'
import { getGroupNameDataSelect } from '@/helpers/getGroupNameDataSelect.ts'
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
  // const isSearchable = (defaultData === DEFAULT_TEACHER_ID && !isMobileDeviceByWidth()) || true
  const isSearchable = true

  const isStudent = defaultData === DEFAULT_GROUP_ID

  const dataSelect = isStudent ? getGroupNameDataSelect(data) : data

  return (
    <Flex align={'center'} gap={20} justify={'space-between'} maw={'900px'}>
      {isStudent && (
        <MultiSelect
          checkIconPosition={'right'}
          data={dataSelect ?? [defaultData]}
          id={'select-role'}
          maxDropdownHeight={rem(450)}
          maxValues={6}
          onChange={value => setSelectGroupId(value)}
          rightSection={<AnimatedIcon />}
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
          id={'select-role'}
          maxDropdownHeight={rem(450)}
          onChange={value => onChangeSelect(value!)}
          rightSection={<AnimatedIcon />}
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
          value={value}
          w={'100%'}
          {...rest}
        />
      )}
    </Flex>
  )
}
