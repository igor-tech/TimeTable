import { IBanner, bannerSlice } from '@/store/slices/bannerSlice.ts'
import {
  IGetLinkToSchedule,
  getLinkToScheduleSlice,
} from '@/store/slices/getLinkToScheduleSlice.ts'
import { IGetSchedule, getScheduleSlice } from '@/store/slices/getScheduleSlice.ts'
import { IState, initSlice } from '@/store/slices/initSlice.ts'
import { ISchedule, scheduleSlice } from '@/store/slices/scheduleSlice.ts'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface BoundStore extends IState, ISchedule, IGetSchedule, IGetLinkToSchedule, IBanner {}

export const useTimeTable = create(
  persist(
    devtools(
      immer<BoundStore>((...a) => ({
        ...initSlice(...a),
        ...scheduleSlice(...a),
        ...getScheduleSlice(...a),
        ...getLinkToScheduleSlice(...a),
        ...bannerSlice(...a),
      }))
    ),
    {
      name: 'uksap-time-table',
    }
  )
)
