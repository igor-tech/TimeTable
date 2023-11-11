import { compareDates } from '@/helpers/compareDates.ts'
import { ICouple } from '@/types/types.ts'

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

  const sortedArrByCoupleNumber = result.map(el =>
    el.sort((a, b) => a.coupleNumber - b.coupleNumber)
  )

  return sortedArrByCoupleNumber
}
