import { FC, Fragment } from 'react'

import { CoupleBadgeWithText } from '@/components/Card/Couple/CoupleBadgeWithText/CoupleBadgeWithText.tsx'
import { CoupleTime } from '@/components/Card/Couple/CoupleTime/CoupleTime.tsx'
import { StatusCouple } from '@/components/Card/Couple/StatusCouple/StatusCouple.tsx'
import { useCouple } from '@/components/Card/Couple/useCouple.tsx'
import { ICouple } from '@/types/types.ts'
import { Card, Flex, Group, Text } from '@mantine/core'

type Props = {
  couple: ICouple
  groupId?: string
  isTeacher?: boolean
}
export const Couple: FC<Props> = ({ couple, groupId, isTeacher = false }) => {
  const { coupleNumber, groupName, officeNumber, subjectName, teacherName } = couple
  const { isAlex, isCurrentCouple, isPractice, styles, title } = useCouple({ couple, groupId })

  return (
    <Card radius={'md'} shadow={'xl'} styles={styles} withBorder>
      <Card.Section py={'sm'} withBorder>
        <Group justify={'space-between'}>
          <Text fw={500}>{title}</Text>

          <StatusCouple couple={couple} isCurrentCouple={isCurrentCouple} />

          <CoupleTime coupleNumber={coupleNumber} isPractice={isPractice} />
        </Group>
      </Card.Section>

      <Card.Section py={'lg'}>
        <Flex direction={'column'} gap={'3px'} w={'100%'}>
          <Text fw={500} fz={'lg'}>
            {subjectName ?? 'Название предмета не указано'}
          </Text>

          <Text fz={'md'}>
            Преподаватель:{' '}
            {teacherName.map((teacher, i) => (
              <Fragment key={i}>
                {teacher} {teacherName.length !== i + 1 && '/ '}
              </Fragment>
            ))}
          </Text>
        </Flex>
        <Flex justify={'space-between'} mt={'10px'}>
          <CoupleBadgeWithText color={'green'} text={' Кабинет:'}>
            {officeNumber ?? 'не указан'}
          </CoupleBadgeWithText>

          {isAlex && (
            <CoupleBadgeWithText color={'red'}>{'Леша где макеты!!!!'}</CoupleBadgeWithText>
          )}

          {isTeacher && (
            <CoupleBadgeWithText color={'blue'} text={'Группа:'}>
              {groupName ?? 'группа не указана'}
            </CoupleBadgeWithText>
          )}
        </Flex>
      </Card.Section>
    </Card>
  )
}
