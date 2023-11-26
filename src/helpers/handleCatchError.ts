import { notifications } from '@mantine/notifications'

export function handleCatchError(error: Error | unknown, title: string) {
  notifications.show({
    color: 'red',
    message: error instanceof Error ? error.message : 'Error',
    title: title,
  })

  console.error(error)
}
