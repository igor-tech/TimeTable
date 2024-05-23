import { notifications } from '@mantine/notifications'

export function handleCatchError(error: Error | unknown, title: string, message?: string) {
  notifications.show({
    color: 'red',
    message: message || (error instanceof Error ? error.message : 'Error'),
    title: title,
  })

  console.error(error)
}
