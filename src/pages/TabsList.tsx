import { useLayoutEffect, useRef, useState } from 'react'

import { DEFAULT_GROUP_ID, DEFAULT_TEACHER_ID, LOCAL_STORAGE_KEY } from '@/components/config.ts'
import { getData } from '@/data/getData.ts'
import { getTimeTableData } from '@/helpers/GetTimeTableData.ts'
import { getFirstDayOfTheWeek } from '@/helpers/getFirstDayOfTheWeek.tsx'
import { useLocalStorage } from '@/hooks/useLocalStorage.tsx'
import { StudentPage } from '@/pages/StudentPage.tsx'
import { TeacherPage } from '@/pages/TeacherPage.tsx'
import { ITimeTable } from '@/types/types.ts'
import { LoadingOverlay, Tabs, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { PiStudentBold } from 'react-icons/pi'

type TabsPage = 'student' | 'teacher'

export const TabsList = () => {
  const [timeTable, setTimeTable] = useLocalStorage<ITimeTable>(LOCAL_STORAGE_KEY, {} as ITimeTable)
  const [tabsPage, setTabsPage] = useLocalStorage<TabsPage>('tabs-page', 'student')
  const [loading, setLoading] = useState<boolean>(true)

  const sectionRef = useRef<HTMLDivElement | null>(null)

  const initialDay = timeTable.firstDayOfWeek
    ? new Date(timeTable.firstDayOfWeek)
    : getFirstDayOfTheWeek(new Date())

  const [firstDay, setFirstDay] = useState<Date>(initialDay)

  const handleFirstDayChange = (date: Date) => {
    setFirstDay(date)
  }

  const handleTabsPageChange = (value: TabsPage) => {
    setTabsPage(value)
  }

  useLayoutEffect(() => {
    const handleScroll = () => {
      setTimeout(() => {
        if (sectionRef && sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
    }

    const fetchData = async () => {
      setLoading(true)

      try {
        if (Object.keys(timeTable).length) {
          setLoading(false)

          handleScroll()

          getData(new Date(firstDay)).then(data => {
            if (data) {
              const localDataString = JSON.stringify(timeTable.couple)
              const remoteDataString = JSON.stringify(data)

              if (localDataString !== remoteDataString) {
                setTimeTable(
                  getTimeTableData(data, timeTable?.groupId, timeTable?.teacherId, firstDay)
                )

                notifications.show({
                  color: 'green',
                  message: 'Расписание успешно обновилсь ✅',
                  title: 'Обновление расписания',
                })
              }
            }
          })
        } else {
          const data = await getData(firstDay)

          if (data) {
            setTimeTable(getTimeTableData(data, DEFAULT_GROUP_ID, DEFAULT_TEACHER_ID, firstDay))
          }
        }
      } catch (error) {
        notifications.show({
          color: 'red',
          message: error instanceof Error ? error.message : 'Error',
          title: 'Упс, возникла ошибка 🤥',
        })

        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchData()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [setTimeTable, firstDay])

  if (loading) {
    return (
      <LoadingOverlay overlayProps={{ blur: 2, radius: 'sm' }} visible={loading} zIndex={1000} />
    )
  }

  return (
    <Tabs
      defaultValue={tabsPage}
      mt={'20px'}
      onChange={value => handleTabsPageChange(value as TabsPage)}
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
        <StudentPage
          onChangeDate={handleFirstDayChange}
          setTimeTable={setTimeTable}
          timeTable={timeTable}
        />
      </Tabs.Panel>

      <Tabs.Panel value={'teacher'}>
        <TeacherPage
          onChangeDate={handleFirstDayChange}
          setTimeTable={setTimeTable}
          timeTable={timeTable}
        />
      </Tabs.Panel>
    </Tabs>
  )
}
