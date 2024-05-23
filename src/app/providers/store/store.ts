import { IBanner, bannerSlice } from '@/app/providers/store/slices/bannerSlice'
import {
  IGetLinkToSchedule,
  getLinkToScheduleSlice,
} from '@/app/providers/store/slices/getLinkToScheduleSlice'
import { IGetSchedule, getScheduleSlice } from '@/app/providers/store/slices/getScheduleSlice'
import { IState, initSlice } from '@/app/providers/store/slices/initSlice'
import { ISchedule, scheduleSlice } from '@/app/providers/store/slices/scheduleSlice'
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
