import { IState, initSlice } from '@/store/slices/initSlice.ts'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface BoundStore extends IState {}

export const useTimeTable = create(
  persist(
    devtools(
      immer<BoundStore>((...a) => ({
        ...initSlice(...a),
      }))
    ),
    {
      name: 'uksap-time-table',
    }
  )
)
