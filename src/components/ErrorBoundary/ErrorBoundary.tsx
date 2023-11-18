import { Component, ErrorInfo, ReactNode } from 'react'

import { Button, Flex, Image, Text } from '@mantine/core'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Обновляем состояние, чтобы следующий рендер показал запасной UI
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Можно добавить логирование ошибки
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  redirectToErrorPage() {
    window.location.href = 'https://uksaptime.vercel.app/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <Flex
          align={'center'}
          direction={'column'}
          gap={'20px'}
          h={'100vh'}
          justify={'center'}
          m={'0 auto'}
          maw={'1200px'}
          p={15}
        >
          <Text fw={'500'} fz={'xl'}>
            {'Упс, возникала ошибка 🤥'}
          </Text>
          <Image alt={'error image'} maw={'800px'} src={'./src/assets/error-image.jpg'} />
          <Button onClick={this.redirectToErrorPage}>Отправиться на рабочую страницу?</Button>
        </Flex>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
