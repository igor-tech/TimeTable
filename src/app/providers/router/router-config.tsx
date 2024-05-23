import { Suspense, lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { routes } from '@/app/providers/router/routes'
import { PATHS } from '@/common/constants/paths'
import { Layout } from '@/components/layout'
import { LoaderOverlay } from '@/components/ui/loader-overlay/loader-overlay'
const HeroPage = lazy(() => import('@/pages/hero/HeroPage'))

const router = createBrowserRouter([
  {
    path: PATHS.BASE,
    element: <Layout />,
    children: [...routes],
    loader: LoaderOverlay,
  },
  {
    path: PATHS.ABOUT,
    element: <HeroPage />,
    loader: LoaderOverlay,
  },
])

export const Router = () => {
  return (
    <Suspense fallback={<LoaderOverlay />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
