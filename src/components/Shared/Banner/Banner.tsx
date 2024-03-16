import { FC, useEffect } from 'react'

import { useTimeTable } from '@/store/store.ts'
import { Button, CloseButton, Group, Paper, Text } from '@mantine/core'

export const CookiesBanner: FC = () => {
  const { isShow, initializeBanner, setPassedStatus, closeBanner } = useTimeTable()

  useEffect(() => {
    initializeBanner()
  }, [initializeBanner, isShow])

  if (!isShow) {
    return null
  }

  return (
    <Paper
      bottom={30}
      p={'lg'}
      pos={'fixed'}
      radius={'md'}
      right={20}
      shadow={'md'}
      style={{ zIndex: 1000 }}
      w={'450px'}
      withBorder
    >
      <Group justify={'space-between'} mb={'xs'}>
        <Text fw={500} fz={'lg'}>
          Удобство пользования расписанием
        </Text>
        <CloseButton mr={-9} mt={-9} onClick={closeBanner} />
      </Group>
      <Text c={'dimmed'} fz={'sm'}>
        Дорогие пользователи, мы хотели бы получить вашу обратную связь относительно нашего
        расписания для студентов и преподавателей.
      </Text>
      <Group justify={'flex-end'} mt={'md'}>
        <Button onClick={setPassedStatus} size={'sm'} variant={'default'}>
          Уже прошел
        </Button>
        <Button
          component={'a'}
          href={'https://forms.gle/ssGmW4r5vy7PJZ2f6'}
          size={'sm'}
          target={'_blank'}
          variant={'outline'}
        >
          Пройти опрос
        </Button>
      </Group>
    </Paper>
  )
}
