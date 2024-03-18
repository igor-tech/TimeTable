import { handleCatchError } from '@/helpers/handleCatchError.ts'
import { BoundStore } from '@/store/store.ts'
import { GenericStateCreator } from '@/store/types.ts'
import dayjs from 'dayjs'
import { produce } from 'immer'

export interface IBanner {
  isPassed: boolean
  isShow: boolean
  validUntil: number
  timeToPressCloseButton: number

  initializeBanner: () => void
  setPassedStatus: () => void
  closeBanner: () => void
}

export const bannerSlice: GenericStateCreator<BoundStore> = (set, get) => ({
  ...get(),
  validUntil: 1711324800000,
  timeToPressCloseButton: 0,

  initializeBanner: async () => {
    try {
      const isDifferenceGreaterThanOneDay =
        get().timeToPressCloseButton !== 0
          ? dayjs(get().timeToPressCloseButton).diff(dayjs(), 'hour') < 6
          : true

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
          state.timeToPressCloseButton = Date.now()
          state.isShow = false
        })
      )
    } catch (e) {
      handleCatchError(e, 'Закрытие баннера')
    }
  },
})
