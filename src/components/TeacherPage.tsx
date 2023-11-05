import { useEffect, useState } from 'react'

import { DayCard } from '@/components/Card/DayCard'
import { fetchData } from '@/data/fetchData'
import { divideArrayByNumberDay } from '@/helpers/divideArrayByNumberDay'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { ICouple } from '@/types/types'
import { Box, Flex, LoadingOverlay, Select, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'

export const TeacherPage = () => {
  const [data, setData] = useState<ICouple[][]>()
  const [localData, setLocalData] = useLocalStorage<ICouple[]>('timeTable', [])
  const [teacherList, setTeacherList] = useLocalStorage<string[]>('teacherList', [])
  const [teacherId, setTeacherId] = useLocalStorage<string>('teacherId', 'Михайлова')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    if (localData.length && teacherList.length) {
      setIsLoading(false)

      return
    }

    fetchData()
      .then(data => {
        if (data) {
          setLocalData(data)

          setTeacherList(
            Array.from(new Set(data?.map(couple => couple.teacherName))).sort((a, b) =>
              a.toLowerCase().charAt(0) < b.toLowerCase().charAt(0) ? -1 : 1
            )
          )

          const filteredData = data.filter(couple => couple.groupName.includes(teacherId))

          if (filteredData) {
            const dividedByDays = divideArrayByNumberDay(filteredData)

            setData(dividedByDays)
          }
        }
      })
      .catch(e => {
        notifications.show({
          color: 'red',
          message: e instanceof Error ? e.message : 'Error',
          title: 'Упс, возникала ошибка 🤥',
        })
      })
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    setIsLoading(true)

    if (!localData.length) {
      setIsLoading(false)

      return
    }

    ;(async () => {
      try {
        const filteredData = localData.filter(couple => couple.teacherName.includes(teacherId))

        if (filteredData) {
          const dividedByDays = divideArrayByNumberDay(filteredData)

          setData(dividedByDays)
        }
      } catch (e) {
        notifications.show({
          color: 'red',
          message: e instanceof Error ? e.message : 'Error',
          title: 'Упс, возникала ошибка 🤥',
        })
      } finally {
        setIsLoading(false)
      }
    })()
  }, [teacherId, localData])

  if (isLoading) {
    return (
      <LoadingOverlay overlayProps={{ blur: 2, radius: 'sm' }} visible={isLoading} zIndex={1000} />
    )
  }

  const teacherName = data?.[0]?.[0]?.teacherName

  return (
    <Box>
      <Select
        checkIconPosition={'right'}
        data={teacherList ?? [teacherId]}
        defaultValue={teacherId}
        label={'Преподаватель:'}
        maxDropdownHeight={'350px'}
        onChange={value => setTeacherId(value!)}
        placeholder={'Выберите перподавателя'}
        value={teacherId}
      />

      {data?.length && (
        <Text fz={'18px'} mt={'15px'}>
          Расписание для преподавателя {teacherName}
          <Text>
            (с {data[0][0].numberDay} по {data[data.length - 1][0].numberDay})
          </Text>
        </Text>
      )}

      {data?.length && (
        <Flex gap={'20px'} justify={'center'} mt={'20px'} w={'100%'} wrap={'wrap'}>
          {data?.map((day, i) => <DayCard day={day} isTeacher key={i} />)}
        </Flex>
      )}

      {!data?.length && (
        <Text fw={'200'} fz={'25px'} mt={'150px'} ta={'center'}>
          Введите имя преподавателя
        </Text>
      )}
    </Box>
  )
}
