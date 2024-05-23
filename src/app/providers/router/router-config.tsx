import { Suspense } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { routes } from '@/app/providers/router/routes'
import { PATHS } from '@/common/constants/paths'
import { Layout } from '@/components/layout'
import { LoaderOverlay } from '@/components/ui/loader-overlay/loader-overlay'

const router = createBrowserRouter([
  {
    path: PATHS.BASE,
    element: <Layout />,
    children: [...routes],
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
