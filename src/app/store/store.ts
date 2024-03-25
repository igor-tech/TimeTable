import { IBanner, bannerSlice } from '@/app/store/slices/bannerSlice.ts'
import {
  IGetLinkToSchedule,
  getLinkToScheduleSlice,
} from '@/app/store/slices/getLinkToScheduleSlice.ts'
import { IGetSchedule, getScheduleSlice } from '@/app/store/slices/getScheduleSlice.ts'
import { IState, initSlice } from '@/app/store/slices/initSlice.ts'
import { ISchedule, scheduleSlice } from '@/app/store/slices/scheduleSlice.ts'
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
