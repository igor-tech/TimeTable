import { IState, initSlice } from '@/store/slices/initSlice.ts'
import { ISchedule, scheduleSlice } from '@/store/slices/scheduleSlice.ts'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface BoundStore extends IState, ISchedule {}

export const useTimeTable = create(
  persist(
    devtools(
      immer<BoundStore>((...a) => ({
        ...initSlice(...a),
        ...scheduleSlice(...a),
      }))
    ),
    {
      name: 'uksap-time-table',
    }
  )
)
