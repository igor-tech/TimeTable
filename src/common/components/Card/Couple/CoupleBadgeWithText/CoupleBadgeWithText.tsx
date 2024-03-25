import { FC, ReactNode } from 'react'

import { ColorScheme } from '@/common/constants/colorShceme.ts'
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
    <Text fw={700} fz={'md'} style={{ whiteSpace: 'nowrap' }}>
      {text}
      <Badge
        color={color}
        component={'p'}
        fz={'md'}
        mb={0}
        ml={'10px'}
        mt={0}
        radius={'md'}
        size={'lg'}
        style={{ textTransform: 'initial' }}
        variant={isDarkTheme ? 'filled' : 'light'}
      >
        {children}
      </Badge>
    </Text>
  )
}
