import { useLayoutEffect, useRef, useState } from 'react'

import { StudentPage } from '@/components/StudentPage.tsx'
import { TeacherPage } from '@/components/TeacherPage.tsx'
import { getData } from '@/data/getData.ts'
import { getTimeTableData } from '@/helpers/GetTimeTableData.ts'
import { useLocalStorage } from '@/hooks/useLocalStorage.tsx'
import { ITimeTable } from '@/types/types.ts'
import { LoadingOverlay, Tabs } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { PiStudentBold } from 'react-icons/pi'

export const TabsList = () => {
  const [timeTable, setTimeTable] = useLocalStorage<ITimeTable>('UKSAP', {} as ITimeTable)
  const [loading, setLoading] = useState<boolean>(true)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const handleScroll = () => {
      setTimeout(() => {
        window.scrollTo({
          behavior: 'smooth',
          top: 300,
        })
      }, 500)
    }

    const fetchData = async () => {
      setLoading(true)

      try {
        if (Object.keys(timeTable).length) {
          setLoading(false)
          handleScroll()
          getData().then(data => {
            if (data) {
              const localDataString = JSON.stringify(timeTable.couple)
              const remoteDataString = JSON.stringify(data)

              if (localDataString !== remoteDataString) {
                setTimeTable(getTimeTableData(data))

                notifications.show({
                  color: 'green',
                  message: 'Расписание успешно обновилсь ✅',
                  title: 'Обновление расписания',
                })
              }
            }
          })
        } else {
          const data = await getData()

          if (data) {
            setTimeTable(getTimeTableData(data))
          }
        }
      } catch (error) {
        notifications.show({
          color: 'red',
          message: error instanceof Error ? error.message : 'Error',
          title: 'Упс, возникла ошибка 🤥',
        })
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
  }, [setTimeTable])

  if (loading) {
    return (
      <LoadingOverlay overlayProps={{ blur: 2, radius: 'sm' }} visible={loading} zIndex={1000} />
    )
  }

  return (
    <Tabs defaultValue={'student'} mt={'20px'} ref={sectionRef}>
      <Tabs.List mb={'20px'}>
        <Tabs.Tab leftSection={<PiStudentBold />} value={'student'} w={'50%'}>
          Студентам
        </Tabs.Tab>

        <Tabs.Tab leftSection={<FaChalkboardTeacher />} value={'teacher'} w={'50%'}>
          Преподавателям
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={'student'}>
        <StudentPage setTimeTable={setTimeTable} timeTable={timeTable} />
      </Tabs.Panel>

      <Tabs.Panel value={'teacher'}>
        <TeacherPage setTimeTable={setTimeTable} timeTable={timeTable} />
      </Tabs.Panel>
    </Tabs>
  )
}
