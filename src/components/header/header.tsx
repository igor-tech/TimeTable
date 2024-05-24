import { ColorScheme } from '@/common/constants/color-scheme'
import { UKSAP_URL } from '@/common/constants/config'
import { SelectWeekButton } from '@/components/ui/select-week-button'
import { StudyTimeModal } from '@/components/ui/study-time-modal'
import { ThemeSwitch } from '@/components/ui/theme-switch'
import { AppShell, Flex, Image, UnstyledButton, useMantineColorScheme } from '@mantine/core'

import styles from './header.module.css'

export const Header = () => {
  const { colorScheme } = useMantineColorScheme()

  const logoDarkUrl = '/assets/logo/logo-dark.png'
  const logoLightUrl = '/assets/logo/logo-light.png'

  const logoUrl = colorScheme === ColorScheme.Dark ? logoDarkUrl : logoLightUrl

  return (
    <AppShell.Header className={styles.header} h={80} pos={'fixed'} withBorder={false}>
      <Flex
        className={styles.header_inner}
        style={{
          boxShadow:
            colorScheme === ColorScheme.Dark
              ? '0 2px 4px rgba(0, 0, 0, 0.4)'
              : 'var(--mantine-shadow-xl)',
        }}
      >
        <UnstyledButton component={'a'} href={UKSAP_URL} target={'_blank'}>
          <Image alt={'logo'} aria-label={'Логотип колледжа УКСАП'} src={logoUrl} w={'150px'} />
        </UnstyledButton>

        <Flex align={'center'} gap={'20px'} justify={'center'}>
          <SelectWeekButton />

          <StudyTimeModal />

          <ThemeSwitch />
        </Flex>
      </Flex>
    </AppShell.Header>
  )
}
