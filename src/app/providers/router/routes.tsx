import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { PATHS } from '@/common/constants/paths'
import { StudentPage } from '@/pages/student-page/StudentPage'
import { TeacherPage } from '@/pages/teacher-page/TeacherPage'

const HeroPage = lazy(() => import('@/pages/hero/HeroPage'))
const NotFound = lazy(() => import('@/pages/not-found/NotFound'))

export const routes: RouteObject[] = [
  {
    path: PATHS.BASE,
    element: <Navigate to={PATHS.STUDENT} />,
  },
  {
    path: PATHS.ABOUT,
    element: <HeroPage />,
  },
  {
    path: PATHS.STUDENT,
    element: <StudentPage />,
  },
  {
    path: PATHS.TEACHER,
    element: <TeacherPage />,
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
