import { FC } from 'react'

import { SESSION_LINK_BY_COURSE } from '@/components/config.ts'
import { ICouple } from '@/types/types.ts'
import { Badge, Button, Card, Divider, Flex, Image, Text } from '@mantine/core'

type Props = {
  couple: ICouple
  courseNumber: number
}

export const SessionCouple: FC<Props> = ({ courseNumber, couple }) => {
  const { link, subjectName } = couple

  const imageUrl =
    'https://polinka.top/uploads/posts/2023-05/1684578025_polinka-top-p-kartinki-smeshnie-sessiya-pinterest-3.jpg'

  return (
    <Card radius={'md'} withBorder>
      <Card.Section p={0}>
        <Image alt={'session image'} src={imageUrl} />
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

      <Flex gap={'20px'} mt={'lg'}>
        {link !== null && (
          <Button radius={'md'} style={{ flex: 1 }}>
            Ссылка на онлайн сессию
          </Button>
        )}

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
      </Flex>
    </Card>
  )
}
