import { FC } from 'react'

import { CoupleBadgeWithText } from '@/components/Card/Couple/CoupleBadgeWithText/CoupleBadgeWithText.tsx'
import { CoupleTime } from '@/components/Card/Couple/CoupleTime/CoupleTime.tsx'
import { SessionCouple } from '@/components/Card/Couple/SessionCouple/SessionCouple.tsx'
import { StatusCouple } from '@/components/Card/Couple/StatusCouple/StatusCouple.tsx'
import { useCouple } from '@/components/Card/Couple/useCouple.tsx'
import { ICouple } from '@/types/types.ts'
import { Box, Button, Card, Divider, Flex, Group, Text } from '@mantine/core'
import { HiOutlineVideoCamera } from 'react-icons/hi'

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
              <Text fw={500} fz={'lg'}>
                {title}
              </Text>

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
                  <Text display={'inline'} fs={'italic'} fw={400} fz={'lg'} key={i}>
                    {teacher} {teacherName.length !== i + 1 && ' / '}
                  </Text>
                ))}
              </Text>
            </Flex>
            <Flex justify={'space-between'} mt={'12px'} rowGap={10} wrap={'wrap'}>
              <Box mr={8}>
                <CoupleBadgeWithText color={'green'} text={' Кабинет:'}>
                  {officeNumber ?? 'не указан'}
                </CoupleBadgeWithText>
              </Box>

              {isTeacher && (
                <CoupleBadgeWithText color={'blue'} text={'Группа:'}>
                  {groupName.split(' ')?.[0] ?? 'группа не указана'}
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
                rightSection={<HiOutlineVideoCamera size={25} />}
                size={'md'}
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
