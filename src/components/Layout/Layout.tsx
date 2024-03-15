import { FC, useLayoutEffect, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { OverlayLoader } from '@/components/Shared/OverlayLoader.tsx'
import { CurrentRole, REQUEST_STATUS } from '@/store/slices/initSlice.ts'
import { useTimeTable } from '@/store/store.ts'
import { BackgroundImage, Center, Tabs, Text } from '@mantine/core'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { PiStudentBold } from 'react-icons/pi'

export const Layout: FC = () => {
  const { status, currentRole, couple, setCurrentRole, getScheduleInBackground } = useTimeTable()
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = () => {
    setTimeout(() => {
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

      if (sectionRef.current) {
        const currentPosition = sectionRef.current.offsetTop

        window.scrollTo({
          top: currentPosition + vh * 0.08,
          behavior: 'smooth',
        })
      }
    }, 500)
  }

  const onChangeTabsHandler = (value: CurrentRole | null) => {
    if (value) {
      navigate(value)
      setCurrentRole(value)
    }
  }

  useLayoutEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleScroll()
        getScheduleInBackground()
      }

      return
    }

    handleScroll()

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [getScheduleInBackground])

  const isLoading = status === REQUEST_STATUS.LOADING || !couple || couple.length === 0

  return (
    <>
      {isLoading && <OverlayLoader />}

      <BackgroundImage
        p={'30px'}
        radius={'md'}
        src={'https://www.uksap.ru/wp-content/uploads/2021/08/header-bg-02-1920x800.png'}
        style={{ backgroundPosition: '0%', objectFit: 'fill' }}
      >
        <Center p={'md'}>
          <Text c={'white'} component={'h1'} fz={'xxxl'} hidden>
            Расписание УКСАП
          </Text>
          <Text c={'white'} component={'h2'} fz={'xxxl'}>
            Расписание
          </Text>
        </Center>
      </BackgroundImage>
      <Tabs defaultValue={currentRole} mt={'20px'} onChange={onChangeTabsHandler} ref={sectionRef}>
        <Tabs.List mb={'20px'}>
          <Tabs.Tab leftSection={<PiStudentBold size={20} />} value={'student'} w={'50%'}>
            <Text fz={'lg'}>Студентам</Text>
          </Tabs.Tab>

          <Tabs.Tab leftSection={<FaChalkboardTeacher size={20} />} value={'teacher'} w={'50%'}>
            <Text fz={'lg'}>Преподавателям</Text>
          </Tabs.Tab>
        </Tabs.List>
        <Outlet />
      </Tabs>
    </>
  )
}
