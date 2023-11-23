import { FC, ReactNode } from 'react'

import { ColorScheme } from '@/constants/colorShceme.ts'
import { Badge, Text, useMantineColorScheme } from '@mantine/core'

type Props = {
  children: ReactNode
  color: string
  text?: string
}
export const CoupleBadgeWithText: FC<Props> = ({ children, color, text }) => {
  const { colorScheme } = useMantineColorScheme()

  const isDarkTheme = ColorScheme.Dark === colorScheme

  return (
    <Text fw={'500'} fz={'sm'} style={{ whiteSpace: 'break-spaces' }}>
      {text}
      <Badge
        color={color}
        component={'p'}
        fz={'xs'}
        ml={'10px'}
        radius={'sm'}
        size={'md'}
        variant={isDarkTheme ? 'filled' : 'light'}
      >
        {children}
      </Badge>
    </Text>
  )
}
