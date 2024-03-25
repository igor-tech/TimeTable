import { FC, useEffect } from 'react'

import { ColorScheme } from '@/common/constants/colorShceme.ts'
import {
  Group,
  MantineColorScheme,
  Switch,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { BiSun } from 'react-icons/bi'
import { RiMoonFill } from 'react-icons/ri'

export const HeaderThemeToggler: FC = () => {
  const theme = useMantineTheme()
  const { colorScheme, setColorScheme, toggleColorScheme } = useMantineColorScheme()

  useEffect(() => {
    const colorSchemeLocalStorage = localStorage.getItem('mantine-color-scheme-value')

    if (colorSchemeLocalStorage) {
      setColorScheme(colorSchemeLocalStorage as MantineColorScheme)

      return
    }

    const getSystemTheme = () => {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setColorScheme('dark')
      } else {
        setColorScheme('light')
      }
    }

    getSystemTheme()

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', getSystemTheme)

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', getSystemTheme)
    }
  }, [setColorScheme])

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
