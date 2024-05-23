import { useCallback, useEffect } from 'react'

import { ColorScheme } from '@/common/constants/color-scheme'
import {
  Group,
  MantineColorScheme,
  Switch,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { BiSun } from 'react-icons/bi'
import { RiMoonFill } from 'react-icons/ri'

export const ThemeSwitch = () => {
  const theme = useMantineTheme()
  const { colorScheme, setColorScheme, toggleColorScheme } = useMantineColorScheme()

  const isDarkTheme = colorScheme === ColorScheme.Dark

  const getSystemTheme = useCallback(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setColorScheme(ColorScheme.Dark)
    } else {
      setColorScheme(ColorScheme.Light)
    }
  }, [setColorScheme])

  useEffect(() => {
    const colorSchemeLocalStorage = localStorage.getItem('mantine-color-scheme-value')

    if (colorSchemeLocalStorage) {
      setColorScheme(colorSchemeLocalStorage as MantineColorScheme)

      return
    }

    getSystemTheme()

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', getSystemTheme)

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', getSystemTheme)
    }
  }, [setColorScheme])

  return (
    <Group justify={'center'}>
      <Switch
        aria-label={'Смена темы'}
        checked={isDarkTheme}
        offLabel={<RiMoonFill color={theme.colors.gray[6]} size={'1.25rem'} stroke={'1.5'} />}
        onChange={toggleColorScheme}
        onLabel={<BiSun color={theme.white} size={'1.25rem'} stroke={'1.5'} />}
        size={'lg'}
      />
    </Group>
  )
}
