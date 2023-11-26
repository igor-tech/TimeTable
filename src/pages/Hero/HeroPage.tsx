import { useNavigate } from 'react-router-dom'

import { PATHS } from '@/constants/PATHS.ts'
import { useTimeTable } from '@/store/store.ts'
import { Button, Container, Group, Image, List, Text, ThemeIcon, rem } from '@mantine/core'
import { FaCheck } from 'react-icons/fa'

import classes from './HeroPage.module.css'

export default function HeroPage() {
  const { setVisitStatus } = useTimeTable()
  const navigate = useNavigate()

  const onClickButtonHandler = () => {
    setVisitStatus()
    navigate(PATHS.STUDENT)
  }

  return (
    <Container size={'xl'}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Text className={classes.title} fw={700} fz={'xxxl'}>
            <span className={classes.highlight}>Оптимизируй</span> свое учебное время!
          </Text>
          <Text c={'dimmed'} fz={'md'} mt={'md'}>
            Веб-приложение предоставляет быстрый и удобный доступ к вашему учебному расписанию,
            помогая вам максимально эффективно организовать свою учебную неделю. Сохраните свою
            группу и получайте мгновенный доступ к актуальному расписанию занятий.
          </Text>

          <List
            icon={
              <ThemeIcon radius={'xl'} size={20}>
                <FaCheck stroke={1.5} style={{ width: rem(12), height: rem(12) }} />
              </ThemeIcon>
            }
            mt={30}
            size={'md'}
            spacing={'md'}
          >
            <List.Item>
              <Text component={'h1'} fw={700} fz={'lg'}>
                Быстрый доступ к расписанию
              </Text>
              Сохраняй свою группу в приложении и получай мгновенный доступ к своему учебному
              расписанию. Теперь ты всегда будешь знать, когда и где у тебя занятия.
            </List.Item>
            <List.Item>
              <Text component={'h1'} fw={700} fz={'lg'}>
                Сравнивайте расписание с друзьями
              </Text>
              добавьте группы друзей и синхронизируйте расписание, чтобы планировать общие перерывы
              и встречи
            </List.Item>
            <List.Item>
              <Text component={'h1'} fw={700} fz={'lg'}>
                Информация о преподавателях
              </Text>
              Узнай расписание и есть преподаватель в колледже. Это позволит тебе эффективно
              планировать встречи, консультации или задать вопросы в удобное для тебя время
            </List.Item>
            <List.Item>
              <Text component={'h1'} fw={700} fz={'lg'}>
                Настройка темы приложения
              </Text>
              Персонализируй приложение, выбрав тему, которая тебе нравится. Ты сможешь создать
              комфортную и приятную визуальную обстановку для работы с приложением
            </List.Item>
          </List>

          <Group mt={30}>
            <Button
              className={classes.control}
              onClick={onClickButtonHandler}
              radius={'xl'}
              size={'xl'}
            >
              Начать использовать
            </Button>
          </Group>
        </div>
        <Image
          alt={'girl sitting at the table'}
          className={classes.image}
          loading={'lazy'}
          src={'src/assets/hero-page.png'}
        />
      </div>
    </Container>
  )
}
