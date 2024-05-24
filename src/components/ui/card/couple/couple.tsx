import { ICouple } from '@/common/types'
import { CoupleBadge } from '@/components/ui/card/couple/couple-badge'
import { StatusCouple } from '@/components/ui/card/couple/couple-status'
import { CoupleTime } from '@/components/ui/card/couple/couple-time'
import { useCouple } from '@/components/ui/card/couple/hooks'
import { Box, Button, Card, Divider, Flex, Group, Text } from '@mantine/core'
import { HiOutlineVideoCamera } from 'react-icons/hi'

import styles from './couple.module.css'

type Props = {
  couple: ICouple
  isTeacher?: boolean
}
export const Couple = ({ couple, isTeacher = false }: Props) => {
  const { coupleNumber, groupName, officeNumber, subjectName, teacherName, link } = couple
  const { isCurrentCouple, isPractice, style, title } = useCouple({ couple })

  return (
    <Box className={`${isCurrentCouple && styles.runningBorder}`}>
      <Card
        radius={'lg'}
        shadow={'xl'}
        style={{ boxShadow: 'rgba(99, 99, 99, 0.12) 0px 2px 8px' }}
        styles={style}
        w={'100%'}
        withBorder
      >
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
              <CoupleBadge color={'green'} text={' Кабинет:'}>
                {officeNumber ?? 'не указан'}
              </CoupleBadge>
            </Box>

            {isTeacher && (
              <CoupleBadge color={'blue'} text={'Группа:'}>
                {groupName ?? 'группа не указана'}
              </CoupleBadge>
            )}
          </Flex>
        </Card.Section>

        {link !== null && (
          <>
            <Box mt={'0.5rem'} w={'100%'}>
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
                variant={'light'}
                w={'100%'}
              >
                Ссылка на онлайн пару
              </Button>
            </Box>
          </>
        )}
      </Card>
    </Box>
  )
}
