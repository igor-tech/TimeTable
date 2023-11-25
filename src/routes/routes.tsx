import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

import { Paths } from '@/constants/paths.ts'
import { StudentPage } from '@/pages/StudentPage.tsx'
import { TeacherPage } from '@/pages/TeacherPage.tsx'

interface IRoutes {
  path: string
  element: ReactElement
}

export const routes: IRoutes[] = [
  {
    path: Paths.home,
    element: <Navigate to={Paths.student} />,
  },
  {
    path: `${Paths.student}`,
    element: <StudentPage />,
  },
  {
    path: `${Paths.teacher}`,
    element: <TeacherPage />,
  },
  // {
  //   path: Paths.error,
  //   element: <div>4 0 4 Not found</div>,
  // },
  // {
  //   path: Paths.notFound,
  //   element: <Navigate to={Paths.error} />,
  // },
]
