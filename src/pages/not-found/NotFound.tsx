import { useNavigate } from 'react-router-dom'

import { PATHS } from '@/common/constants/paths'
import { Box, Button, Container, Image, SimpleGrid, Text, Title } from '@mantine/core'

import styles from './NotFound.module.css'

export default function NotFound() {
  const navigate = useNavigate()

  const onClickButtonHandler = () => {
    navigate(PATHS.STUDENT)
  }

  return (
    <Container className={styles.root}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 40, sm: 80 }}>
        <Image
          className={styles.mobileImage}
          loading={'lazy'}
          src={'src/assets/illustrations/not-found.svg'}
        />
        <Box>
          <Title className={styles.title}>Что-то пошло не так...</Title>
          <Text c={'dimmed'} size={'lg'}>
            Страница, которую вы пытаетесь открыть, не существует. Возможно, вы ошиблись при вводе
            адреса, или страница была перемещена на другой URL.
          </Text>
          <Button
            className={styles.control}
            mt={'xl'}
            onClick={onClickButtonHandler}
            size={'md'}
            variant={'outline'}
          >
            Вернуться на страницу с расписанием
          </Button>
        </Box>
      </SimpleGrid>
    </Container>
  )
}
