import { Button, CloseButton, Group, Paper, Text } from '@mantine/core'

export function CookiesBanner() {
  return (
    <Paper p={'lg'} radius={'md'} shadow={'md'} withBorder>
      <Group justify={'space-between'} mb={'xs'}>
        <Text fw={500} fz={'md'}>
          Allow cookies
        </Text>
        <CloseButton mr={-9} mt={-9} />
      </Group>
      <Text c={'dimmed'} fz={'xs'}>
        So the deal is, we want to spy on you. We would like to know what did you have for todays
        breakfast, where do you live, how much do you earn and like 50 other things. To view our
        landing page you will have to accept all cookies. That&apos;s all, and remember that we are
        watching...
      </Text>
      <Group justify={'flex-end'} mt={'md'}>
        <Button size={'xs'} variant={'default'}>
          Cookies preferences
        </Button>
        <Button size={'xs'} variant={'outline'}>
          Accept all
        </Button>
      </Group>
    </Paper>
  )
}
