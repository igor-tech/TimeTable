import { TabsList } from '@/components/TabsList'
import { AppShell, BackgroundImage, Center, Image, Text, UnstyledButton } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import '@mantine/core/styles.css'

function App() {
  return (
    <>
      <AppShell header={{ height: 60 }} m={'0 auto'} maw={'1200px'}>
        <Notifications
          autoClose={6000}
          style={{ position: 'fixed', right: 0, top: '80px', width: '300px', zIndex: '10' }}
          withinPortal={false}
        />

        <AppShell.Header>
          <UnstyledButton component={'a'} href={'https://www.uksap.ru/'}>
            <Image
              src={'https://www.uksap.ru/wp-content/uploads/2023/02/uksap-logo_gs-2.png'}
              w={'150px'}
            />
          </UnstyledButton>
        </AppShell.Header>
        <AppShell.Main mt={'60px'} p={10}>
          <BackgroundImage
            p={'30px'}
            radius={'md'}
            src={'https://www.uksap.ru/wp-content/uploads/2021/08/header-bg-02-1920x800.png'}
            style={{ backgroundPosition: '0%', objectFit: 'fill' }}
          >
            <Center p={'md'}>
              <Text c={'white'} fz={'35px'}>
                Расписание
              </Text>
            </Center>
          </BackgroundImage>

          <TabsList />
        </AppShell.Main>
      </AppShell>
    </>
  )
}

export default App
