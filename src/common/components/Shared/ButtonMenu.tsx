import { FC, useState } from 'react'

import { useTimeTable } from '@/app/store/store.ts'
import { AnimatedIcon } from '@/common/components/Shared/IconComponent/AnimatedIcon.tsx'
import { DEFAULT_GROUP_ID } from '@/common/components/config.ts'
import { Theme } from '@/common/constants/theme.ts'
import { getGroupNameDataSelect } from '@/common/helpers/getGroupNameDataSelect.ts'
import { Flex, MultiSelect, Select, rem } from '@mantine/core'

type CustomSelectProps = {
  data: string[]
  defaultData: string
  label?: string
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
  const [isOpen, setIsOpen] = useState(false)

  const { setSelectGroupId, groupId } = useTimeTable()

  const isStudent = defaultData === DEFAULT_GROUP_ID

  const dataSelect = isStudent ? getGroupNameDataSelect(data) : data

  return (
    <Flex
      align={'center'}
      gap={20}
      id={'select-role'}
      justify={'space-between'}
      maw={'900px'}
      mt={20}
    >
      {isStudent && (
        <MultiSelect
          checkIconPosition={'right'}
          data={dataSelect ?? [defaultData]}
          dropdownOpened={isOpen}
          maxDropdownHeight={rem(450)}
          maxValues={6}
          onBlur={() => setIsOpen(false)}
          onChange={value => setSelectGroupId(value)}
          onClick={() => setIsOpen(!isOpen)}
          radius={'lg'}
          rightSection={<AnimatedIcon />}
          searchable
          size={'xl'}
          styles={{
            wrapper: {
              boxShadow: 'var(--mantine-shadow-sm)',
              borderRadius: 'var(--mantine-radius-lg)',
            },
            dropdown: {
              boxShadow: 'var(--mantine-shadow-xl)',
              borderRadius: 'var(--mantine-radius-lg)',
            },
            groupLabel: { fontSize: `${Theme.fontSizes.md}` },
            input: {
              fontSize: `${Theme.fontSizes.lg}`,
              border: 'none',
              boxShadow: 'var(--mantine-shadow-md)',
            },
            label: { fontSize: `${Theme.fontSizes.xl}`, fontWeight: '300' },
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
          dropdownOpened={isOpen}
          maxDropdownHeight={rem(450)}
          onBlur={() => setIsOpen(false)}
          onChange={value => onChangeSelect(value!)}
          onClick={() => setIsOpen(!isOpen)}
          radius={'lg'}
          rightSection={<AnimatedIcon />}
          searchable
          size={'xl'}
          styles={{
            wrapper: {
              boxShadow: 'var(--mantine-shadow-sm)',
              borderRadius: 'var(--mantine-radius-lg)',
            },
            dropdown: {
              boxShadow: 'var(--mantine-shadow-xl)',
              borderRadius: 'var(--mantine-radius-lg)',
            },
            groupLabel: { fontSize: `${Theme.fontSizes.md}` },
            input: {
              fontSize: `${Theme.fontSizes.lg}`,
              border: 'none',
              boxShadow: 'var(--mantine-shadow-md)',
            },
            label: { fontSize: `${Theme.fontSizes.xl}`, fontWeight: '300' },
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
