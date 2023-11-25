import { FC } from 'react'

import { HeaderThemeToggler } from '@/components/Layout/ThemeSwitch.tsx'
import { ColorScheme } from '@/constants/colorShceme.ts'
import { Flex, Image, UnstyledButton, useMantineColorScheme } from '@mantine/core'

export const Header: FC = () => {
  const { colorScheme } = useMantineColorScheme()
  const logoDarkUrl =
    'https://moodle.uksap.ru/pluginfile.php/1/theme_eguru/logo/1663748986/uksap-logo-inverse-500x135px.png'
  const logoLightUrl = 'https://www.uksap.ru/wp-content/uploads/2023/02/uksap-logo_gs-2.png'

  const logoUrl = colorScheme === ColorScheme.Dark ? logoDarkUrl : logoLightUrl

  return (
    <Flex align={'center'} h={'60px'} justify={'space-between'} pl={'20px'} pr={'20px'}>
      <UnstyledButton component={'a'} href={'https://www.uksap.ru/'}>
        <Image src={logoUrl} w={'150px'} />
      </UnstyledButton>

      <Flex align={'center'} gap={'20px'} justify={'center'}>
        <HeaderThemeToggler />
      </Flex>
    </Flex>
  )
}
