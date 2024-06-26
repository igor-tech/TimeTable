import {
  CURRENT_ROLE,
  CurrentRole,
  REQUEST_STATUS,
  VISIT_STATUS,
} from '@/app/providers/store/slices/initSlice'
import { BoundStore } from '@/app/providers/store/store'
import { GenericStateCreator } from '@/app/providers/store/types'
import { ICouple } from '@/common/types'
import { divideArrayByNumberDay } from '@/common/utils/divideArrayByNumberDay'
import { getFirstDayOfTheWeek } from '@/common/utils/getFirstDayOfTheWeek'
import { handleCatchError } from '@/common/utils/handleCatchError'
import { produce } from 'immer'

export interface ISchedule {
  couple: ICouple[]
  groupId: string[]
  teacherId: string
  groupList: string[]
  teacherList: string[]
  firstDayOfWeek: number
  studentsGroupsCouple: ICouple[][][]
  teacherCouple: ICouple[][]

  getScheduleInBackground: () => void
  setGroupId: (groupId: string, currentRole: CurrentRole) => void
  setFirstDayOfWeek: (date: Date) => void
  setSelectGroupId: (value: string[]) => void
  filteredCoupleByGroupId: (role?: CurrentRole) => void
}

export const scheduleSlice: GenericStateCreator<BoundStore> = (set, get) => ({
  ...get(),

  getScheduleInBackground: async () => {
    try {
      const isFirstVisit = get().visitStatus === VISIT_STATUS.NO_VISITED

      const firstDayOfWeek = new Date(get()?.firstDayOfWeek)

      const remoteData = await get().getSchedule(firstDayOfWeek)

      const groupList: string[] = Array.from(new Set(remoteData?.map(couple => couple.groupName)))

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
    } catch (error) {
      handleCatchError(
        error,
        'Обновление расписания',
        'Расписания на эту неделю нет, выберите правильную дату ❌'
      )
    }
  },

  setGroupId: async (groupId, currentRole) => {
    try {
      set(
        produce((state: BoundStore) => {
          if (currentRole === CURRENT_ROLE.STUDENT) {
            state.groupId = [groupId]
            get().filteredCoupleByGroupId()
          } else {
            state.teacherId = groupId
            get().filteredCoupleByGroupId(CURRENT_ROLE.TEACHER)
          }
        })
      )
    } catch (e) {
      handleCatchError(e, 'Установка группы')
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
      handleCatchError(e, 'Установка даты')
    } finally {
      set(
        produce((state: BoundStore) => {
          state.status = REQUEST_STATUS.IDLE
        })
      )
    }
  },

  setSelectGroupId: async value => {
    try {
      set(
        produce((state: BoundStore) => {
          state.groupId = value
          state.status = REQUEST_STATUS.LOADING
        })
      )

      get().filteredCoupleByGroupId()
    } catch (e) {
      handleCatchError(e, 'Установка группы')
    } finally {
      set(
        produce((state: BoundStore) => {
          state.status = REQUEST_STATUS.IDLE
        })
      )
    }
  },

  filteredCoupleByGroupId: async role => {
    try {
      set(
        produce((state: BoundStore) => {
          state.status = REQUEST_STATUS.LOADING
        })
      )

      const teacherId = get().teacherId
      const groupId: string[] = get().groupId
      const couple: ICouple[] = get().couple

      if (!couple) {
        return
      }

      if (role && role === CURRENT_ROLE.TEACHER) {
        const filteredArrById = couple.filter(couple => couple.teacherName.includes(teacherId))

        const dividedByDay = divideArrayByNumberDay(filteredArrById)

        set(
          produce((state: BoundStore) => {
            state.teacherCouple = dividedByDay
          })
        )

        return
      }

      const filteredCouple = groupId.map(id => {
        const filteredArrById = couple.filter(couple => couple.groupName === id)

        return divideArrayByNumberDay(filteredArrById)
      })

      set(
        produce((state: BoundStore) => {
          state.studentsGroupsCouple = filteredCouple
        })
      )
    } catch (e) {
      handleCatchError(e, 'Обновление расписания')
    } finally {
      set(
        produce((state: BoundStore) => {
          state.status = REQUEST_STATUS.IDLE
        })
      )
    }
  },
})
