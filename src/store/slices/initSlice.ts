import { DEFAULT_GROUP_ID, DEFAULT_TEACHER_ID } from '@/components/config.ts'
import { getData } from '@/data/getData.ts'
import { getFirstDayOfTheWeek } from '@/helpers/getFirstDayOfTheWeek.tsx'
import { BoundStore } from '@/store/store.ts'
import { GenericStateCreator } from '@/store/types.ts'
import { ICouple } from '@/types/types.ts'
import { notifications } from '@mantine/notifications'
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

  // Поместить в отдельный slice timeTable
  couple: ICouple[]
  groupId: string
  teacherId: string
  groupList: string[]
  teacherList: string[]
  firstDayOfWeek: number

  getScheduleInBackground: () => void
  initializeApp: () => void
  setFirstVisitSettings: () => void
  setGroupId: (groupId: string, currentRole: CurrentRole) => void
  setCurrentRole: (currentRole: CurrentRole) => void
  setFirstDayOfWeek: (date: Date) => void
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
      })
    )

    try {
      await get().setFirstVisitSettings()

      get().getScheduleInBackground()
    } catch (e) {
      notifications.show({
        color: 'red',
        message: e instanceof Error ? e.message : 'Error',
        title: 'Упс, возникла ошибка 🤥',
      })

      console.error(e)
      // TODO: Написать функцию для обработки ошибок
    } finally {
      set(
        produce((state: BoundStore) => {
          state.isInitialized = true
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
        const firstDayOfWeekNumber = getFirstDayOfTheWeek(new Date()).getTime()

        set(
          produce((state: BoundStore) => {
            state.groupId = DEFAULT_GROUP_ID
            state.teacherId = DEFAULT_TEACHER_ID
            state.currentRole = CURRENT_ROLE.STUDENT
            state.firstDayOfWeek = firstDayOfWeekNumber
          })
        )
      }
    } catch (e) {
      console.error(e)
      // TODO: Написать функцию для обработки ошибок
    } finally {
      set(
        produce((state: BoundStore) => {
          state.status = REQUEST_STATUS.IDLE
        })
      )
    }
  },

  getScheduleInBackground: async () => {
    try {
      const isFirstVisit = get().visitStatus === VISIT_STATUS.NO_VISITED

      const firstDayOfWeek = new Date(get()?.firstDayOfWeek)

      const remoteData = await getData(firstDayOfWeek)

      const groupList = Array.from(new Set(remoteData?.map(couple => couple.groupName)))
      const teacherList: string[] = Array.from(
        new Set(remoteData?.flatMap(val => val.teacherName).flat())
      ).sort((a, b) => (a.toLowerCase().charAt(0) < b.toLowerCase().charAt(0) ? -1 : 1))

      if (!isFirstVisit) {
        const localData = get()?.couple

        const localDataString = JSON.stringify(localData)
        const remoteDataString = JSON.stringify(remoteData)

        if (localDataString !== remoteDataString) {
          set(
            produce((state: BoundStore) => {
              state.couple = remoteData!
              state.groupList = groupList
              state.teacherList = teacherList
            })
          )

          // TODO: надо подумать надо ли всегда показывать, что расписание обновилось
          notifications.show({
            color: 'green',
            message: 'Расписание успешно обновилсь ✅',
            title: 'Обновление расписания',
          })
        }

        return
      }

      set(
        produce((state: BoundStore) => {
          state.couple = remoteData!
          state.groupList = groupList
          state.teacherList = teacherList
        })
      )
    } catch (e) {
      notifications.show({
        color: 'red',
        message: 'Расписания на эту неделю нет, выберите правильную дату ❌',
        title: 'Обновление расписания',
      })
    }
  },

  setGroupId: async (groupId, currentRole) => {
    try {
      set(
        produce((state: BoundStore) => {
          if (currentRole === CURRENT_ROLE.STUDENT) {
            state.groupId = groupId
          } else {
            state.teacherId = groupId
          }
        })
      )
    } catch (e) {
      console.error(e)
      // TODO: Написать функцию для обработки ошибок
    }
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
      console.error(e)
      // TODO: Написать функцию для обработки ошибок
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
      console.error(e)
      // TODO: Написать функцию для обработки ошибок
    }
  },

  setFirstDayOfWeek: async date => {
    try {
      set(
        produce((state: BoundStore) => {
          state.firstDayOfWeek = date.getTime()
          state.status = REQUEST_STATUS.LOADING
        })
      )
      await get().getScheduleInBackground()
    } catch (e) {
      const firstDayOfWeekNumber = getFirstDayOfTheWeek(new Date()).getTime()

      set(
        produce((state: BoundStore) => {
          state.firstDayOfWeek = firstDayOfWeekNumber
        })
      )

      console.error(e)
      // TODO: Написать функцию для обработки ошибок
    } finally {
      set(
        produce((state: BoundStore) => {
          state.status = REQUEST_STATUS.IDLE
        })
      )
    }
  },

  setVisitStatus: () => {
    set(
      produce((state: BoundStore) => {
        state.visitStatus = VISIT_STATUS.VISITED
      })
    )
  },
})
