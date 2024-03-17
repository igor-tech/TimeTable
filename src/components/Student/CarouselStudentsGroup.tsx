import { DaysCard } from '@/components/Card/DaysCard.tsx'
import { useTimeTable } from '@/store/store.ts'
import { Carousel } from '@mantine/carousel'
import { Text } from '@mantine/core'

import styles from './CarouselStudentsGroup.module.css'

export const CarouselStudentsGroup = () => {
  const { studentsGroupsCouple } = useTimeTable()

  return (
    <Carousel
      align={'start'}
      classNames={styles}
      draggable={studentsGroupsCouple.length > 1}
      slideGap={150}
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
              <Text fz={'lg'} id={'timetable-title'} mt={'15px'}>
                Группа{' '}
                <Text display={'inline'} fw={700} fz={'lg'} style={{ whiteSpace: 'nowrap' }}>
                  {groupName}
                </Text>{' '}
                (с {group[0][0].numberDay} по {group[group.length - 1][0].numberDay})
              </Text>
            )}
            {group && group.length > 0 && <DaysCard data={group} />}
          </Carousel.Slide>
        )
      })}
    </Carousel>
  )
}
