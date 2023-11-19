import { FC } from 'react'

import { TIME_DATA } from '@/components/config.ts'
import { Flex, Text } from '@mantine/core'
import { FiMinus } from 'react-icons/fi'

type Props = {
  coupleNumber: number
  isPractice: boolean
}
export const CoupleTime: FC<Props> = ({ coupleNumber, isPractice }) => {
  const startCouple = isPractice ? '9:00' : TIME_DATA[coupleNumber][1]
  const endCouple = isPractice ? '14:00' : TIME_DATA[coupleNumber][2]

  return (
    <Flex align={'center'} ta={'center'}>
      <Text fz={'md'} w={'50px'}>
        {startCouple}
      </Text>
      <FiMinus size={15} />
      <Text fz={'md'} w={'50px'}>
        {endCouple}
      </Text>
    </Flex>
  )
}
