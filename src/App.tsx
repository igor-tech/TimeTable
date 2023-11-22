import { Header } from '@/components/Layout/Header.tsx'
import { TabsList } from '@/pages/TabsList.tsx'
import { AppShell, BackgroundImage, Center, Text } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { Analytics } from '@vercel/analytics/react'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

function App() {
  return (
    <AppShell header={{ height: 60 }} m={'0 auto'} maw={'1800px'}>
      <Notifications
        autoClose={6000}
        style={{ position: 'fixed', right: 0, top: '80px', width: '300px', zIndex: '10' }}
        withinPortal={false}
      />
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main p={10} pt={'70px'}>
        <BackgroundImage
          p={'30px'}
          radius={'md'}
          src={'https://www.uksap.ru/wp-content/uploads/2021/08/header-bg-02-1920x800.png'}
          style={{ backgroundPosition: '0%', objectFit: 'fill' }}
        >
          <Center p={'md'}>
            <Text c={'white'} component={'h1'} fz={'xxxl'} hidden>
              Расписание УКСАП
            </Text>
            <Text c={'white'} component={'h2'} fz={'xxxl'}>
              Расписание
            </Text>
          </Center>
        </BackgroundImage>

        <TabsList />
        <Analytics />
      </AppShell.Main>
    </AppShell>
  )
}

export default App
