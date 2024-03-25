import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTimeTable } from '@/app/store/store.ts'
import { Paths } from '@/common/constants/paths.ts'
import { Box, Button, Container, Group, Image, List, Text, ThemeIcon } from '@mantine/core'
import { FaCheck } from 'react-icons/fa'

import classes from './HeroPage.module.css'

export default function HeroPage() {
  const { setVisitStatus } = useTimeTable()
  const [imageSrc, setImageSrc] = useState('src/assets/hero-page.png')
  const navigate = useNavigate()

  const handleImageError = () => {
    setImageSrc('https://ui.mantine.dev/_next/static/media/image.9a65bd94.svg')
  }

  const onClickButtonHandler = () => {
    setVisitStatus()
    navigate(Paths.STUDENT)
  }

  return (
    <Container size={'xl'}>
      <Box className={classes.inner}>
        <Box className={classes.content}>
          <Text className={classes.title} fw={700} fz={'xxxl'}>
            <span className={classes.highlight}>Оптимизируй</span> свое учебное время!
          </Text>
          <Text c={'dimmed'} fz={'md'} mt={'md'}>
            Привет, студенты колледжа УКСАП! Устали теряться во времени и пропускать важные занятия?
            Мы знаем, как сделать вашу учебную жизнь гораздо проще и организованнее. Представляем
            вам наше новое веб-приложение с расписанием, которое облегчит вашу жизнь и поможет быть
            всегда в курсе своих занятий.
          </Text>

          <List
            icon={
              <ThemeIcon radius={'xl'} size={25}>
                <FaCheck size={14} />
              </ThemeIcon>
            }
            mt={30}
            size={'md'}
            spacing={'md'}
          >
            <List.Item>
              <Text component={'h1'} fw={700} fz={'lg'}>
                🚀 Быстрый доступ к расписанию
              </Text>
              Сохраняй свою группу в приложении и получай мгновенный доступ к своему учебному
              расписанию. Теперь ты всегда будешь знать, когда и где у тебя занятия.
            </List.Item>
            <List.Item>
              <Text component={'h1'} fw={700} fz={'lg'}>
                📱 Добавьте иконку приложения на домашний экран iPhone!
              </Text>
              Мы ценим ваше удобство, поэтому наше веб-приложение с расписанием предоставляет
              возможность добавить иконку на домашний экран вашего iPhone. Теперь вы можете получить
              быстрый доступ к вашему расписанию всего в одно касание!
            </List.Item>
            <List.Item>
              <Text component={'h1'} fw={700} fz={'lg'}>
                👥 Сравнивайте свое расписание с группами друзей
              </Text>
              добавьте группы друзей и синхронизируйте расписание, чтобы планировать общие перерывы
              и встречи
            </List.Item>
            <List.Item>
              <Text component={'h1'} fw={700} fz={'lg'}>
                👩‍🏫 Информация о преподавателях
              </Text>
              Хотите узнать, когда и где встретиться с преподавателем? Наше приложение предоставляет
              информацию о преподавателях в колледже. Теперь вы сможете эффективно планировать
              встречи, консультации или задать вопросы в удобное для вас время.
            </List.Item>
            <List.Item>
              <Text component={'h1'} fw={700} fz={'lg'}>
                🎨 Настройка темы приложения
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
        </Box>
        <Image
          className={classes.image}
          loading={'lazy'}
          onError={handleImageError}
          src={imageSrc}
        />
      </Box>
    </Container>
  )
}
