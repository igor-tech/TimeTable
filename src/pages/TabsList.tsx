import { useLayoutEffect, useRef } from 'react'

import { StudentPage } from '@/pages/StudentPage.tsx'
import { TeacherPage } from '@/pages/TeacherPage.tsx'
import { CurrentRole, REQUEST_STATUS } from '@/store/slices/initSlice.ts'
import { useTimeTable } from '@/store/store.ts'
import { LoadingOverlay, Tabs, Text } from '@mantine/core'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { PiStudentBold } from 'react-icons/pi'

export const TabsList = () => {
  const { status, currentRole, couple, setCurrentRole, getScheduleInBackground } = useTimeTable()

  const sectionRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = () => {
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
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

  if (isLoading) {
    return <LoadingOverlay overlayProps={{ blur: 2, radius: 'sm' }} visible zIndex={1000} />
  }

  return (
    <Tabs
      defaultValue={currentRole}
      mt={'20px'}
      onChange={value => setCurrentRole(value as CurrentRole)}
      ref={sectionRef}
    >
      <Tabs.List mb={'20px'}>
        <Tabs.Tab leftSection={<PiStudentBold size={20} />} value={'student'} w={'50%'}>
          <Text fz={'lg'}>Студентам</Text>
        </Tabs.Tab>

        <Tabs.Tab leftSection={<FaChalkboardTeacher size={20} />} value={'teacher'} w={'50%'}>
          <Text fz={'lg'}>Преподавателям</Text>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value={'student'}>
        <StudentPage />
      </Tabs.Panel>

      <Tabs.Panel value={'teacher'}>
        <TeacherPage />
      </Tabs.Panel>
    </Tabs>
  )
}
