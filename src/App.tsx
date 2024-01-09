import { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import { Header } from '@/components/Layout/Header.tsx'
import { Layout } from '@/components/Layout/Layout.tsx'
import { ParticlesEffect } from '@/components/Partilces/ParticlesEffect.tsx'
import { OverlayLoader } from '@/components/Shared/OverlayLoader.tsx'
import { PATHS } from '@/constants/PATHS.ts'
import { outletRoutes, routes } from '@/routes/routes.tsx'
import { VISIT_STATUS } from '@/store/slices/initSlice.ts'
import { useTimeTable } from '@/store/store.ts'
import { AppShell } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { Analytics } from '@vercel/analytics/react'

import '@mantine/carousel/styles.css'
import '@mantine/core/styles.css'
import '@mantine/core/styles/global.css'
import '@mantine/dates/styles.css'

function App() {
  const { isInitialized, initializeApp, visitStatus, currentRole } = useTimeTable()
  const navigate = useNavigate()

  useEffect(() => {
    initializeApp()
    if (visitStatus === VISIT_STATUS.NO_VISITED) {
      navigate(PATHS.HOME)
    } else {
      navigate(`/${currentRole}`)
    }
  }, [initializeApp, visitStatus])

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
          <ParticlesEffect />
          <Suspense fallback={<OverlayLoader />}>
            <Routes>
              <Route element={<Navigate to={`/${currentRole}`} />} path={'/'} />
              <Route element={<Layout />} path={'/'}>
                {outletRoutes.map(route => (
                  <Route element={route.element} key={route.path} path={route.path} />
                ))}
              </Route>

              {routes.map(route => (
                <Route element={route.element} key={route.path} path={route.path} />
              ))}
            </Routes>
            <Analytics />
          </Suspense>
        </AppShell.Main>
      </AppShell>
    </ModalsProvider>
  )
}

export default App
