import { SESSION_LINK_BY_COURSE } from '@/common/constants/config'
import { ICouple } from '@/common/types'
import { Badge, Button, Card, Divider, Flex, Image, Text } from '@mantine/core'

type Props = {
  couple: ICouple
  courseNumber: number
}

export const SessionCouple = ({ courseNumber, couple }: Props) => {
  const { link, subjectName } = couple

  return (
    <Card radius={'md'} withBorder>
      <Card.Section p={0}>
        <Image alt={'session image'} src={'/assets/images/session-mem.jpg'} />
      </Card.Section>

      <Card.Section mt={'lg'}>
        <Flex align={'center'} gap={10} justify={'apart'}>
          <Text fw={500} fz={'lg'}>
            {subjectName}
          </Text>
          <Badge size={'md'} variant={'light'}>
            Сессия
          </Badge>
        </Flex>
        <Text fz={'md'} mb={'lg'} mt={'xs'}>
          Если экзамен будет проходить в онлайн формате в самом низу появится синняя кнопка.
        </Text>
      </Card.Section>

      <Divider />

      <Flex gap={'20px'} mt={'lg'} wrap={'wrap'}>
        <Button
          component={'a'}
          href={SESSION_LINK_BY_COURSE[courseNumber]}
          radius={'md'}
          style={{ flex: 1 }}
          target={'_blank'}
          variant={'outline'}
        >
          Расписание экзаменов
        </Button>

        {link !== null && (
          <Button component={'a'} href={link} radius={'md'} style={{ flex: 1 }} target={'_blank'}>
            Ссылка на онлайн сессию
          </Button>
        )}
      </Flex>
    </Card>
  )
}
