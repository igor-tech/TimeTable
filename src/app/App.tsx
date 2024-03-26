import { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import { outletRoutes, routes } from '@/app/routes/routes.tsx'
import { VISIT_STATUS } from '@/app/store/slices/initSlice.ts'
import { useTimeTable } from '@/app/store/store.ts'
import { Header } from '@/common/components/Layout/Header.tsx'
import { Layout } from '@/common/components/Layout/Layout.tsx'
import { OverlayLoader } from '@/common/components/Shared/OverlayLoader.tsx'
import { Paths } from '@/common/constants/paths.ts'
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
      navigate(Paths.HOME)
    } else {
      navigate(`/${currentRole}`)
    }
  }, [initializeApp, visitStatus])

  if (!isInitialized) {
    return <OverlayLoader />
  }

  return (
    <ModalsProvider>
      <AppShell m={'auto'} maw={'1800px'}>
        <Notifications
          autoClose={6000}
          style={{ position: 'fixed', right: 0, top: '115px', width: '300px', zIndex: '10' }}
          withinPortal={false}
        />
        <AppShell.Header
          style={{
            border: 'none',
            borderRadius: '0 0 var(--mantine-radius-xl) var(--mantine-radius-xl)',
          }}
        >
          <Header />
        </AppShell.Header>
        <AppShell.Main p={'0.5rem'} pt={'105px'}>
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
