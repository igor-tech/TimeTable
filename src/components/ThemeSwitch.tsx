import { FC } from 'react'

import { ColorScheme } from '@/constants/colorShceme.ts'
import { Group, Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { BiSun } from 'react-icons/bi'
import { RiMoonFill } from 'react-icons/ri'

export const HeaderThemeToggler: FC = () => {
  const theme = useMantineTheme()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const isDarkTheme = colorScheme === ColorScheme.Dark

  return (
    <Group justify={'center'}>
      <Switch
        checked={isDarkTheme}
        offLabel={<RiMoonFill color={theme.colors.gray[6]} size={'1.25rem'} stroke={'1.5'} />}
        onChange={toggleColorScheme}
        onLabel={<BiSun color={theme.white} size={'1.25rem'} stroke={'1.5'} />}
        size={'lg'}
      />
    </Group>
  )
}
