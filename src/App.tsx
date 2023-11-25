import { FC, Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'

import { Header } from '@/components/Layout/Header.tsx'
import { OverlayLoader } from '@/components/Shared/OverlayLoader.tsx'
import { HeroPage } from '@/pages/Hero/HeroPage.tsx'
import { routes } from '@/routes/routes.tsx'
import { CurrentRole, REQUEST_STATUS, VISIT_STATUS } from '@/store/slices/initSlice.ts'
import { useTimeTable } from '@/store/store.ts'
import { AppShell, BackgroundImage, Center, Tabs, Text } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { Analytics } from '@vercel/analytics/react'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { PiStudentBold } from 'react-icons/pi'

import '@mantine/core/styles.css'
import '@mantine/core/styles/global.css'
import '@mantine/dates/styles.css'

function App() {
  const { isInitialized, initializeApp, visitStatus } = useTimeTable()
  const navigate = useNavigate()

  useEffect(() => {
    initializeApp()
    if (visitStatus === VISIT_STATUS.NO_VISITED) {
      navigate('main')
    }
  }, [initializeApp])

  if (!isInitialized) {
    return <OverlayLoader />
  }

  return (
    <ModalsProvider>
      <AppShell header={{ height: 60 }} m={'auto'} maw={'1800px'}>
        <Notifications
          autoClose={6000}
          style={{ position: 'fixed', right: 0, top: '80px', width: '300px', zIndex: '10' }}
          withinPortal={false}
        />
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Main p={15} pt={'70px'}>
          <Suspense fallback={<OverlayLoader />}>
            <Routes>
              <Route element={<HeroPage />} path={'/main'} />
              <Route element={<TimeTable />} path={'/'}>
                {routes.map(route => (
                  <Route element={route.element} key={route.path} path={route.path} />
                ))}
              </Route>
            </Routes>
            <Analytics />
          </Suspense>
        </AppShell.Main>
      </AppShell>
    </ModalsProvider>
  )
}

export default App

const TimeTable: FC = () => {
  const { status, currentRole, couple, setCurrentRole, getScheduleInBackground } = useTimeTable()
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = () => {
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
  }

  const onChangeTabsHandler = (value: CurrentRole | null) => {
    if (value) {
      navigate(value)
      setCurrentRole(value)
    }
  }

  useLayoutEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleScroll()
        getScheduleInBackground()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [getScheduleInBackground])

  const isLoading = status === REQUEST_STATUS.LOADING || !couple || couple.length === 0

  return (
    <>
      {isLoading && <OverlayLoader />}
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
      <Tabs defaultValue={currentRole} mt={'20px'} onChange={onChangeTabsHandler} ref={sectionRef}>
        <Tabs.List mb={'20px'}>
          <Tabs.Tab leftSection={<PiStudentBold size={20} />} value={'student'} w={'50%'}>
            <Text fz={'lg'}>Студентам</Text>
          </Tabs.Tab>

          <Tabs.Tab leftSection={<FaChalkboardTeacher size={20} />} value={'teacher'} w={'50%'}>
            <Text fz={'lg'}>Преподавателям</Text>
          </Tabs.Tab>
        </Tabs.List>
        <Outlet />
      </Tabs>
    </>
  )
}
