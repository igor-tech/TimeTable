import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'
import { useLayout } from '@/components/layout/hooks/useLayout'
import { BackgroundBanner } from '@/components/ui/background-banner'
import { Banner } from '@/components/ui/banner'
import { QueryLoading } from '@/components/ui/query-loading'
import { RoleSelection } from '@/components/ui/role-selection'
import { AppShell } from '@mantine/core'

export const Layout = () => {
  const { isLoading } = useLayout()

  return (
    <>
      {isLoading && <QueryLoading />}

      <Header />

      <Banner />

      <AppShell.Main p={'0.5rem'} pt={'105px'}>
        <BackgroundBanner />

        <RoleSelection />

        <Outlet />
      </AppShell.Main>
    </>
  )
}
