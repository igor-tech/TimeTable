import { ICouple } from '@/common/types'
import { compareDates } from '@/common/utils/compareDates'

export const divideArrayByNumberDay = (array: ICouple[]) => {
  const sortedArrByDay = array.sort((a, b) => compareDates(a.numberDay, b.numberDay))

  const result: ICouple[][] = []
  let currentArray: ICouple[] = []

  for (let i = 0; i < sortedArrByDay.length; i++) {
    if (i === 0 || sortedArrByDay[i].numberDay !== sortedArrByDay[i - 1].numberDay) {
      currentArray = []
      result.push(currentArray)
    }

    currentArray.push(sortedArrByDay[i])
  }

  return result.map(el => el.sort((a, b) => a.coupleNumber - b.coupleNumber))
}
