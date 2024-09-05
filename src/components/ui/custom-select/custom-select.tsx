import { FC, useState } from 'react'

import { useTimeTable } from '@/app/providers/store/store'
import { DEFAULT_GROUP_ID } from '@/common/constants/config'
import { Theme } from '@/common/constants/theme'
import { getGroupNameDataSelect } from '@/common/utils/getGroupNameDataSelect'
import { InputAnimatedIcon } from '@/components/ui/input-animated-icon'
import { Flex, MultiSelect, Select, rem } from '@mantine/core'

type CustomSelectProps = {
  data: string[]
  defaultData: string
  label?: string
  onChangeSelect: (groupId: string) => void
  placeholder: string
  value: string
}
export const CustomSelect: FC<CustomSelectProps> = ({
  data,
  defaultData,
  onChangeSelect,
  value,
  ...rest
}) => {
  const { setSelectGroupId, groupId } = useTimeTable()
  const [isOpen, setIsOpen] = useState(false)

  const onChangeGroupIdHandler = (value: string[]) => {
    setSelectGroupId(value)
    setIsOpen(false)
  }

  const onChangeTeacherIdHandler = (value: null | string) => {
    console.log(value)
    if (value) {
      onChangeSelect(value)
      setIsOpen(false)
    }
  }

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
          aria-label={'Выбор группы'}
          checkIconPosition={'right'}
          data={dataSelect ?? [defaultData]}
          dropdownOpened={isOpen}
          maxDropdownHeight={rem(450)}
          maxValues={6}
          onBlur={() => setIsOpen(false)}
          onChange={onChangeGroupIdHandler}
          onClick={() => setIsOpen(!isOpen)}
          radius={'lg'}
          rightSection={<InputAnimatedIcon />}
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
          aria-label={'Выбор преподавателя'}
          checkIconPosition={'right'}
          data={dataSelect ?? [defaultData]}
          dropdownOpened={isOpen}
          maxDropdownHeight={rem(450)}
          onBlur={() => setIsOpen(false)}
          onChange={onChangeTeacherIdHandler}
          onClick={() => setIsOpen(!isOpen)}
          radius={'lg'}
          rightSection={<InputAnimatedIcon />}
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
