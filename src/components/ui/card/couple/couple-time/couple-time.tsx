import { TIME_DATA } from '@/common/constants/config'
import { Flex, Text } from '@mantine/core'
import { FiMinus } from 'react-icons/fi'

type Props = {
  coupleNumber: number
  isPractice: boolean
}
export const CoupleTime = ({ coupleNumber, isPractice }: Props) => {
  const startCouple = isPractice ? '9:00' : TIME_DATA[coupleNumber][1]
  const endCouple = isPractice ? '14:00' : TIME_DATA[coupleNumber][2]

  return (
    <Flex align={'center'} gap={3} ta={'center'}>
      <Text fz={'lg'}>{startCouple}</Text>
      <FiMinus size={15} />
      <Text fz={'lg'}>{endCouple}</Text>
    </Flex>
  )
}
