import { ReactElement, lazy } from 'react'
import { Navigate } from 'react-router-dom'

import { Paths } from '@/common/constants/paths.ts'

const HeroPage = lazy(() => import('@/app/pages/Hero/HeroPage.tsx'))
const NotFound = lazy(() => import('@/app/pages/NotFound/NotFound.tsx'))
const StudentPage = lazy(() => import('@/app/pages/StudentPage.tsx'))
const TeacherPage = lazy(() => import('@/app/pages/TeacherPage.tsx'))

interface IRoutes {
  path: string
  element: ReactElement
}

export const outletRoutes: IRoutes[] = [
  {
    path: Paths.STUDENT,
    element: <StudentPage />,
  },
  {
    path: Paths.TEACHER,
    element: <TeacherPage />,
  },
]

export const routes: IRoutes[] = [
  {
    path: Paths.HOME,
    element: <HeroPage />,
  },
  {
    path: Paths.ERROR,
    element: <NotFound />,
  },
  {
    path: Paths.NOT_FOUND,
    element: <Navigate to={Paths.ERROR} />,
  },
]
