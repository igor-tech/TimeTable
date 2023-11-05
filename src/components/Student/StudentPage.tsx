import { useEffect, useState } from 'react'

import { DayCard } from '@/components/Card/DayCard'
import { fetchData } from '@/data/fetchData'
import { divideArrayByNumberDay } from '@/helpers/divideArrayByNumberDay'
import { optionsFilter } from '@/helpers/optionsFilter'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { ICouple } from '@/types/types'
import { Box, Flex, LoadingOverlay, Select, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'

export const StudentPage = () => {
  const [data, setData] = useState<ICouple[][]>()
  const [localData, setLocalData] = useLocalStorage<ICouple[]>('timeTable', [])
  const [groupList, setGroupList] = useLocalStorage<string[]>('groupList', [])
  const [groupId, setGroupId] = useLocalStorage<string>('groupId', 'А-123/9')

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)

    if (localData.length) {
      setLoading(false)

      return
    }

    fetchData()
      .then(data => {
        if (data) {
          setLocalData(data)

          setGroupList(Array.from(new Set(data?.map(couple => couple.groupName))))

          const filteredData = data.filter(couple => couple.groupName.includes(groupId))

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
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setLoading(true)
    if (!localData.length) {
      setLoading(false)

      return
    }

    ;(async () => {
      try {
        const filteredData = localData.filter(couple => couple.groupName.includes(groupId))

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
        setLoading(false)
      }
    })()
  }, [groupId])

  if (loading) {
    return (
      <LoadingOverlay overlayProps={{ blur: 2, radius: 'sm' }} visible={loading} zIndex={1000} />
    )
  }

  const groupName = data && data?.[0]?.[0]?.groupName

  return (
    <Box>
      <Select
        checkIconPosition={'right'}
        data={groupList ?? [groupId]}
        defaultValue={groupId}
        filter={optionsFilter}
        label={'Группа:'}
        maxDropdownHeight={'300px'}
        nothingFoundMessage={'Nothing found...'}
        onChange={value => setGroupId(value!)}
        placeholder={'Выберите группу'}
        searchable
        value={groupId}
      />

      {data?.length && (
        <Text fz={'18px'} mt={'15px'}>
          Группа {groupName} (с {data[0][0].numberDay} по {data[data.length - 1][0].numberDay})
        </Text>
      )}
      <Flex gap={'20px'} justify={'center'} mt={'20px'} w={'100%'} wrap={'wrap'}>
        {data?.map((day, i) => <DayCard day={day} key={i} />)}
      </Flex>

      {!data?.length && (
        <Text fw={'200'} fz={'25px'} mt={'150px'} ta={'center'}>
          Выберите группу
        </Text>
      )}
    </Box>
  )
}
