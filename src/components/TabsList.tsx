import { useEffect, useState } from 'react'

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

  useEffect(() => {
    setLoading(true)

    if (Object.keys(timeTable).length) {
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
      setLoading(false)

      return
    }

    getData()
      .then(data => {
        if (!data) {
          return
        }
        setTimeTable(getTimeTableData(data))
      })
      .catch(e => {
        notifications.show({
          color: 'red',
          message: e instanceof Error ? e.message : 'Error',
          title: 'Упс, возникала ошибка 🤥',
        })
      })
      .finally(() => setLoading(false))
  }, [setTimeTable, timeTable])

  if (loading) {
    return (
      <LoadingOverlay overlayProps={{ blur: 2, radius: 'sm' }} visible={loading} zIndex={1000} />
    )
  }

  return (
    <Tabs defaultValue={'student'} mt={'20px'}>
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
