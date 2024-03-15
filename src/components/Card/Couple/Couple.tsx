import { FC, Fragment } from 'react'

import { CoupleBadgeWithText } from '@/components/Card/Couple/CoupleBadgeWithText/CoupleBadgeWithText.tsx'
import { CoupleTime } from '@/components/Card/Couple/CoupleTime/CoupleTime.tsx'
import { SessionCouple } from '@/components/Card/Couple/SessionCouple/SessionCouple.tsx'
import { StatusCouple } from '@/components/Card/Couple/StatusCouple/StatusCouple.tsx'
import { useCouple } from '@/components/Card/Couple/useCouple.tsx'
import { ICouple } from '@/types/types.ts'
import { Button, Card, Divider, Flex, Group, Text } from '@mantine/core'
import { BiLogoZoom } from 'react-icons/bi'

type Props = {
  couple: ICouple
  isTeacher?: boolean
}
export const Couple: FC<Props> = ({ couple, isTeacher = false }) => {
  const { coupleNumber, groupName, officeNumber, subjectName, teacherName, link, courseNumber } =
    couple
  const { isCurrentCouple, isPractice, styles, title, isSession } = useCouple({ couple })

  return (
    <>
      {isSession && <SessionCouple couple={couple} courseNumber={courseNumber} />}
      {!isSession && (
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
                    {teacher} {teacherName.length !== i + 1 && ' / '}
                  </Fragment>
                ))}
              </Text>
            </Flex>
            <Flex justify={'space-between'} mt={'10px'}>
              <CoupleBadgeWithText color={'green'} text={' Кабинет:'}>
                {officeNumber ?? 'не указан'}
              </CoupleBadgeWithText>

              {isTeacher && (
                <CoupleBadgeWithText color={'blue'} text={'Группа:'}>
                  {groupName ?? 'группа не указана'}
                </CoupleBadgeWithText>
              )}
            </Flex>
          </Card.Section>

          {link !== null && (
            <>
              <Divider />
              <Button
                component={'a'}
                fz={'md'}
                href={link}
                mt={'20px'}
                radius={'md'}
                rightSection={<BiLogoZoom size={25} />}
                target={'_blank'}
              >
                Ссылка на онлайн пару
              </Button>
            </>
          )}
        </Card>
      )}
    </>
  )
}
