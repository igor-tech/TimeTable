import { FC, useLayoutEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { CurrentRole, REQUEST_STATUS } from '@/app/store/slices/initSlice.ts'
import { useTimeTable } from '@/app/store/store.ts'
import { CookiesBanner } from '@/common/components/Shared/Banner/Banner.tsx'
import { OverlayLoader } from '@/common/components/Shared/OverlayLoader.tsx'
import { BackgroundImage, Center, SegmentedControl, Text } from '@mantine/core'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { PiStudentBold } from 'react-icons/pi'

export const Layout: FC = () => {
  const { status, currentRole, couple, setCurrentRole, getScheduleInBackground } = useTimeTable()
  const navigate = useNavigate()

  const handleScroll = () => {
    setTimeout(() => {
      const selectElement = document.getElementById('select-role')

      if (selectElement) {
        const rect = selectElement.getBoundingClientRect()
        const scrollTop = window.scrollY || document.documentElement.scrollTop

        window.scrollTo({
          top: rect.bottom + scrollTop - 60,
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

  const isLoading = status === REQUEST_STATUS.LOADING || !couple || couple?.length === 0

  return (
    <>
      {isLoading && <OverlayLoader />}

      <CookiesBanner />

      <BackgroundImage
        p={'30px'}
        radius={'md'}
        src={'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png'}
        styles={{ root: { objectFit: 'cover' } }}
      >
        <Center p={'md'}>
          <Text c={'white'} component={'h1'} fz={'xxxl'} hidden>
            Расписание УКСАП
          </Text>
          <Text c={'#fafafa'} component={'h2'} fz={45}>
            Расписание
          </Text>
        </Center>
      </BackgroundImage>

      <SegmentedControl
        data={[
          {
            value: 'student',
            label: (
              <Center style={{ gap: 10 }}>
                <PiStudentBold size={20} />
                <Text fz={'lg'}>Студентам</Text>
              </Center>
            ),
          },
          {
            value: 'teacher',
            label: (
              <Center style={{ gap: 10 }}>
                <FaChalkboardTeacher size={20} />
                <Text fz={'lg'}>Преподавателям</Text>
              </Center>
            ),
          },
        ]}
        defaultValue={currentRole}
        fullWidth
        mt={25}
        onChange={onChangeTabsHandler}
        radius={'lg'}
        size={'xl'}
        style={{ boxShadow: 'var(--mantine-shadow-lg)' }}
        transitionDuration={500}
        transitionTimingFunction={'linear'}
      />
      <Outlet />
    </>
  )
}
