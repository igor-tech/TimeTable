import { BackgroundImage, Center, Text } from '@mantine/core'

export const BackgroundBanner = () => {
  return (
    <section>
      <BackgroundImage
        p={'30px'}
        radius={'md'}
        src={'/assets/images/bg-banner.png'}
        styles={{ root: { objectFit: 'cover' } }}
      >
        <Center p={'md'}>
          <Text c={'#fafafa'} component={'h1'} fz={45}>
            Расписание
          </Text>
        </Center>
      </BackgroundImage>
    </section>
  )
}
