import { FC } from 'react'

import { HeaderThemeToggler } from '@/components/Layout/ThemeSwitch.tsx'
import { SelectWeekButton } from '@/components/Shared/SelectWeekButton/SelectWeekButton.tsx'
import { StudyTimeButton } from '@/components/Shared/StudyTimeButton/StudyTimeButton.tsx'
import { ColorScheme } from '@/constants/colorShceme.ts'
import { Flex, Image, UnstyledButton, useMantineColorScheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export const Header: FC = () => {
  const { colorScheme } = useMantineColorScheme()
  const logoDarkUrl =
    'https://www.uksap.ru/wp-content/uploads/2019/12/uksap-logo-inverse-500x135px.png'
  const logoLightUrl = 'https://www.uksap.ru/wp-content/uploads/2023/02/uksap-logo_gs-2.png'

  const logoUrl = colorScheme === ColorScheme.Dark ? logoDarkUrl : logoLightUrl
  const matches = useMediaQuery('(min-width: 580px)')

  return (
    <Flex
      align={'center'}
      h={'80px'}
      justify={'space-between'}
      ml={matches ? '20px' : '0px'}
      mr={matches ? '20px' : '0px'}
      pl={'20px'}
      pr={'20px'}
      style={{
        boxShadow:
          colorScheme === ColorScheme.Dark
            ? '4px 4px 4px rgba(0,0,0, 0.2)'
            : 'var(--mantine-shadow-lg)',
        borderRadius: '0 0 var(--mantine-radius-xl) var(--mantine-radius-xl)',
        border: 'calc(0.0625rem* var(--mantine-scale)) solid var(--_app-shell-border-color)',
      }}
    >
      <UnstyledButton component={'a'} href={'https://www.uksap.ru/'}>
        <Image src={logoUrl} w={'150px'} />
      </UnstyledButton>

      <Flex align={'center'} gap={'20px'} justify={'center'}>
        <SelectWeekButton />

        <StudyTimeButton />

        <HeaderThemeToggler />
      </Flex>
    </Flex>
  )
}
