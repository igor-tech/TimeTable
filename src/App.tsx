import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary.tsx'
import { TabsList } from '@/components/TabsList.tsx'
import { HeaderThemeToggler } from '@/components/ThemeSwitch.tsx'
import { ColorScheme } from '@/constants/colorShceme.ts'
import {
  AppShell,
  BackgroundImage,
  Center,
  Flex,
  Image,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { Analytics } from '@vercel/analytics/react'

import '@mantine/core/styles.css'

function App() {
  const { colorScheme } = useMantineColorScheme()

  const logoDarkUrl =
    'https://moodle.uksap.ru/pluginfile.php/1/theme_eguru/logo/1663748986/uksap-logo-inverse-500x135px.png'
  const logoLightUrl = 'https://www.uksap.ru/wp-content/uploads/2023/02/uksap-logo_gs-2.png'

  const logoUrl = colorScheme === ColorScheme.Dark ? logoDarkUrl : logoLightUrl

  return (
    <ErrorBoundary>
      <AppShell header={{ height: 60 }} m={'0 auto'} maw={'1800px'}>
        <Notifications
          autoClose={6000}
          style={{ position: 'fixed', right: 0, top: '80px', width: '300px', zIndex: '10' }}
          withinPortal={false}
        />
        <AppShell.Header>
          <Flex align={'center'} h={'60px'} justify={'space-between'} pl={'10px'} pr={'10px'}>
            <UnstyledButton component={'a'} href={'https://www.uksap.ru/'}>
              <Image src={logoUrl} w={'150px'} />
            </UnstyledButton>
            <HeaderThemeToggler />
          </Flex>
        </AppShell.Header>
        <AppShell.Main mt={'60px'} p={10}>
          <BackgroundImage
            p={'30px'}
            radius={'md'}
            src={'//https://www.uksap.ru/wp-content/uploads/2021/08/header-bg-02-1920x800.png'}
            style={{ backgroundPosition: '0%', objectFit: 'fill' }}
          >
            <Center p={'md'}>
              <Text c={'white'} fz={'xxxl'}>
                Расписание
              </Text>
            </Center>
          </BackgroundImage>

          <TabsList />
          <Analytics />
        </AppShell.Main>
      </AppShell>
    </ErrorBoundary>
  )
}

export default App
