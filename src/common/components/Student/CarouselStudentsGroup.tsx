import { useTimeTable } from '@/app/store/store.ts'
import { DaysCard } from '@/common/components/Card/DaysCard.tsx'
import { Carousel } from '@mantine/carousel'
import { Box, Text } from '@mantine/core'

import styles from './CarouselStudentsGroup.module.css'

export const CarouselStudentsGroup = () => {
  const { studentsGroupsCouple } = useTimeTable()

  return (
    <Carousel
      align={0}
      classNames={styles}
      draggable={studentsGroupsCouple.length > 1}
      loop
      mb={10}
      mt={15}
      slideGap={150}
      speed={2}
      styles={{
        root: { display: 'flex' },
        viewport: { height: '100%', width: '100%' },
      }}
      withControls={false}
      withIndicators={studentsGroupsCouple.length > 1}
    >
      {studentsGroupsCouple.map(group => {
        const groupName = group && group?.[0]?.[0]?.groupName

        return (
          <Carousel.Slide key={groupName}>
            {group && group.length > 0 && (
              <Box mb={10} mt={5}>
                <Text display={'inline'} fz={'lg'} id={'timetable-title'}>
                  Группа{' '}
                </Text>
                <Text display={'inline'} fw={700} fz={'lg'} style={{ whiteSpace: 'nowrap' }}>
                  {groupName}
                </Text>{' '}
                <Text display={'inline'} fw={300} fz={'lg'} style={{ whiteSpace: 'nowrap' }}>
                  (с {group[0][0].numberDay} по {group[group.length - 1][0].numberDay})
                </Text>
              </Box>
            )}
            {group && group.length > 0 && <DaysCard data={group} />}
          </Carousel.Slide>
        )
      })}
    </Carousel>
  )
}
