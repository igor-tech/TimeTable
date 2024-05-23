import { useNavigate } from 'react-router-dom'

import { CurrentRole } from '@/app/providers/store/slices/initSlice'
import { useTimeTable } from '@/app/providers/store/store'
import { Center, SegmentedControl, Text } from '@mantine/core'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { PiStudentBold } from 'react-icons/pi'

export const RoleSelection = () => {
  const { currentRole, setCurrentRole } = useTimeTable()

  const navigate = useNavigate()

  const onChangeTabsHandler = (value: CurrentRole | null) => {
    if (value) {
      navigate(value)
      setCurrentRole(value)
    }
  }

  return (
    <section>
      <SegmentedControl
        data={[
          {
            value: 'student',
            label: (
              <Center style={{ gap: '1rem' }}>
                <PiStudentBold size={'1.5rem'} />
                <Text component={'h2'} fz={'lg'}>
                  Студентам
                </Text>
              </Center>
            ),
          },
          {
            value: 'teacher',
            label: (
              <Center style={{ gap: '1rem' }}>
                <FaChalkboardTeacher size={'1.5rem'} />
                <Text component={'h2'} fz={'lg'}>
                  Преподавателям
                </Text>
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
    </section>
  )
}
