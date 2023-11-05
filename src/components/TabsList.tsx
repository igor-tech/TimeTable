import { StudentPage } from '@/components/Student/StudentPage'
import { TeacherPage } from '@/components/TeacherPage'
import { Tabs } from '@mantine/core'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { PiStudentBold } from 'react-icons/pi'

export const TabsList = () => {
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
        <StudentPage />
      </Tabs.Panel>

      <Tabs.Panel value={'teacher'}>
        <TeacherPage />
      </Tabs.Panel>
    </Tabs>
  )
}
