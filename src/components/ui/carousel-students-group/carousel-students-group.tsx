import { useTimeTable } from '@/app/providers/store/store'
import { WeeklyCards } from '@/components/ui/card/weekly-cards'
import { Carousel } from '@mantine/carousel'
import { Box, Text } from '@mantine/core'

import styles from './carousel-students-group.module.css'

export const CarouselStudentsGroup = () => {
  const { studentsGroupsCouple } = useTimeTable()

  return (
    <Carousel
      align={0}
      classNames={{ indicator: styles.indicator, indicators: styles.indicators }}
      draggable={studentsGroupsCouple.length > 1}
      loop
      mb={10}
      mt={15}
      slideGap={150}
      styles={{
        root: { display: 'flex' },
        viewport: { height: '100%', width: '100vw' },
        indicator: { backgroundColor: 'var(--mantine-color-blue-5)' },
        indicators: { display: 'flex', justifyContent: 'right', top: '4.2rem', right: '20px' },
      }}
      withControls={false}
      withIndicators={studentsGroupsCouple.length > 1}
    >
      {studentsGroupsCouple?.map(group => {
        const groupName = group && group?.[0]?.[0]?.groupName

        return (
          <Carousel.Slide key={groupName}>
            {group && group?.length > 0 && (
              <Box mb={10} mt={5}>
                <Text display={'inline'} fz={'lg'} id={'timetable-title'}>
                  Группа{' '}
                </Text>
                <Text display={'inline'} fw={700} fz={'lg'} style={{ whiteSpace: 'nowrap' }}>
                  {groupName}
                </Text>{' '}
                <Text display={'inline'} fw={300} fz={'lg'}>
                  (с {group[0][0].numberDay} по {group[group.length - 1][0].numberDay})
                </Text>
              </Box>
            )}
            {group && group?.length > 0 && <WeeklyCards data={group} />}
          </Carousel.Slide>
        )
      })}
    </Carousel>
  )
}
