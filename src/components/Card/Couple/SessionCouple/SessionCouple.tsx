import { FC } from 'react'

import { SESSION_LINK_BY_COURSE } from '@/components/config.ts'
import { Button, Card, Overlay, Text } from '@mantine/core'

import styles from './SessionCouple.module.css'

type Props = {
  courseNumber: number
}

export const SessionCouple: FC<Props> = ({ courseNumber }) => {
  return (
    <Card className={styles.card} radius={'md'}>
      <Overlay opacity={0.55} zIndex={0} />

      <div className={styles.content}>
        <Text className={styles.title} fw={700} size={'xl'}>
          Сессия
        </Text>

        <Text className={styles.description} size={'lg'}>
          Кнопка ведет на pdf файл с расписанием экзаменов текущего курса
        </Text>

        <Button
          className={styles.action}
          color={'dark'}
          component={'a'}
          href={SESSION_LINK_BY_COURSE[courseNumber]}
          size={'md'}
          target={'_blank'}
          variant={'white'}
        >
          Перейти
        </Button>
      </div>
    </Card>
  )
}
