import { handleCatchError } from '@/helpers/handleCatchError.ts'
import { BoundStore } from '@/store/store.ts'
import { GenericStateCreator } from '@/store/types.ts'
import dayjs from 'dayjs'
import { produce } from 'immer'

export interface IBanner {
  isPassed: boolean
  isShow: boolean
  validUntil: number
  closeTime: number

  initializeBanner: () => void
  setPassedStatus: () => void
  closeBanner: () => void
}

export const bannerSlice: GenericStateCreator<BoundStore> = (set, get) => ({
  ...get(),
  validUntil: 1711324800000,
  closeTime: 1711324800000,

  initializeBanner: async () => {
    try {
      const isDifferenceGreaterThanOneDay = dayjs(get().closeTime).diff(dayjs(), 'day') < 0

      set(
        produce((state: BoundStore) => {
          state.isShow =
            !get().isPassed && get().validUntil > Date.now() && isDifferenceGreaterThanOneDay
        })
      )
    } catch (e) {
      handleCatchError(e, 'Загрузка приложения')
    }
  },

  setPassedStatus: () => {
    try {
      set(
        produce((state: BoundStore) => {
          state.isPassed = true
          state.isShow = false
        })
      )
    } catch (e) {
      handleCatchError(e, 'Установка статуса опроса')
    }
  },

  closeBanner: () => {
    try {
      set(
        produce((state: BoundStore) => {
          state.closeTime = Date.now()
          state.isShow = false
        })
      )
    } catch (e) {
      handleCatchError(e, 'Закрытие баннера')
    }
  },
})
