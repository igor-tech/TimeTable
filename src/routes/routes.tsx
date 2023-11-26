import { ReactElement, lazy } from 'react'
import { Navigate } from 'react-router-dom'

import { PATHS } from '@/constants/PATHS.ts'

const HeroPage = lazy(() => import('@/pages/Hero/HeroPage.tsx'))
const NotFound = lazy(() => import('@/pages/NotFound/NotFound.tsx'))
const StudentPage = lazy(() => import('@/pages/StudentPage.tsx'))
const TeacherPage = lazy(() => import('@/pages/TeacherPage.tsx'))

interface IRoutes {
  path: string
  element: ReactElement
}

export const outletRoutes: IRoutes[] = [
  {
    path: PATHS.STUDENT,
    element: <StudentPage />,
  },
  {
    path: PATHS.TEACHER,
    element: <TeacherPage />,
  },
]

export const routes: IRoutes[] = [
  {
    path: PATHS.HOME,
    element: <HeroPage />,
  },
  {
    path: PATHS.ERROR,
    element: <NotFound />,
  },
  {
    path: PATHS.NOT_FOUND,
    element: <Navigate to={PATHS.ERROR} />,
  },
]
