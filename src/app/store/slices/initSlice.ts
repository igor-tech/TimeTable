import { BoundStore } from '@/app/store/store.ts'
import { GenericStateCreator } from '@/app/store/types.ts'
import { DEFAULT_GROUP_ID, DEFAULT_TEACHER_ID } from '@/common/components/config.ts'
import { handleCatchError } from '@/common/helpers/handleCatchError.ts'
import dayjs from 'dayjs'
import { produce } from 'immer'

export const REQUEST_STATUS = {
  FAILED: 'failed',
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
} as const

type RequestStatusType = (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS]

export const CURRENT_ROLE = {
  STUDENT: 'student',
  TEACHER: 'teacher',
}
export const VISIT_STATUS = {
  VISITED: 'visited',
  NO_VISITED: 'noVisited',
} as const

type VisitStatus = (typeof VISIT_STATUS)[keyof typeof VISIT_STATUS]
export type CurrentRole = (typeof CURRENT_ROLE)[keyof typeof CURRENT_ROLE]

export interface IState {
  isInitialized: boolean
  visitStatus: VisitStatus
  isLoadingExcel: boolean
  status: RequestStatusType
  error: null | string
  currentRole: CurrentRole

  initializeApp: () => void
  setFirstVisitSettings: () => void
  setCurrentRole: (currentRole: CurrentRole) => void
  setVisitStatus: () => void
  setStatusApp: (status: RequestStatusType) => void
}

export const initSlice: GenericStateCreator<BoundStore> = (set, get) => ({
  ...get(),
  isInitialized: false,
  visitStatus: 'noVisited',
  isLoading: false,
  isLoadingData: false,
  groupList: [],
  teacherList: [],

  initializeApp: async () => {
    set(
      produce((state: BoundStore) => {
        state.isInitialized = false
        state.status = REQUEST_STATUS.LOADING
      })
    )

    try {
      get().setFirstVisitSettings()

      get().getScheduleInBackground()
    } catch (e) {
      handleCatchError(e, 'Загрузка приложения')
    } finally {
      set(
        produce((state: BoundStore) => {
          state.isInitialized = true
          state.status = REQUEST_STATUS.IDLE
        })
      )
    }
  },

  setFirstVisitSettings: async () => {
    try {
      set(
        produce((state: BoundStore) => {
          state.status = REQUEST_STATUS.LOADING
        })
      )
      const isFirstVisit = get().visitStatus === VISIT_STATUS.NO_VISITED

      if (isFirstVisit) {
        set(
          produce((state: BoundStore) => {
            state.groupId = [DEFAULT_GROUP_ID]
            state.teacherId = DEFAULT_TEACHER_ID
            state.currentRole = CURRENT_ROLE.STUDENT
          })
        )
      }

      const currentDate = dayjs()

      const currentDayOfWeek = currentDate.day()

      const currentHour = currentDate.hour()

      const isAfterSaturday16 = currentDayOfWeek === 6 && currentHour >= 16

      const daysToAdd = (currentDayOfWeek === 0 && 1) || (isAfterSaturday16 && 2) || 0

      set(
        produce((state: BoundStore) => {
          state.firstDayOfWeek =
            daysToAdd === 0
              ? dayjs().startOf('week').valueOf()
              : dayjs().startOf('day').add(daysToAdd, 'day').valueOf()
        })
      )
    } catch (e) {
      handleCatchError(e, 'Загрузка приложения')
    } finally {
      set(
        produce((state: BoundStore) => {
          state.status = REQUEST_STATUS.IDLE
        })
      )
    }
  },

  setStatusApp: status => {
    try {
      set(
        produce((state: BoundStore) => {
          state.status = status
        })
      )
    } catch (e) {
      handleCatchError(e, 'Статус приложения')
    }
  },

  setVisitStatus: () => {
    set(
      produce((state: BoundStore) => {
        state.visitStatus = VISIT_STATUS.VISITED
      })
    )
  },

  setCurrentRole: currentRole => {
    try {
      set(
        produce((state: BoundStore) => {
          state.currentRole = currentRole
          state.status = REQUEST_STATUS.LOADING
        })
      )
    } catch (e) {
      handleCatchError(e, 'Установка роли')
    } finally {
      set(
        produce((state: BoundStore) => {
          state.status = REQUEST_STATUS.IDLE
        })
      )
    }
  },
})
