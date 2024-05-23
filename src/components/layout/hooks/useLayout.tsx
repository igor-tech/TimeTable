import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { REQUEST_STATUS, VISIT_STATUS } from '@/app/providers/store/slices/initSlice'
import { useTimeTable } from '@/app/providers/store/store'
import { PATHS } from '@/common/constants/paths'

export const useLayout = () => {
  const {
    isInitialized,
    initializeApp,
    visitStatus,
    currentRole,
    status,
    couple,
    getScheduleInBackground,
  } = useTimeTable()
  const navigate = useNavigate()

  const handleScroll = useCallback(() => {
    setTimeout(() => {
      const selectElement = document.getElementById('select-role')

      if (selectElement) {
        const rect = selectElement.getBoundingClientRect()
        const scrollTop = window.scrollY || document.documentElement.scrollTop

        window.scrollTo({
          top: rect.bottom + scrollTop - 60,
          behavior: 'smooth',
        })
      }
    }, 500)
  }, [])

  const handleNavigation = useCallback(() => {
    if (visitStatus === VISIT_STATUS.NO_VISITED) {
      return navigate(PATHS.ABOUT)
    }

    return navigate(`/${currentRole}`)
  }, [currentRole, visitStatus])

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible') {
      handleScroll()
      getScheduleInBackground()
    }

    return
  }, [])

  useEffect(() => {
    initializeApp()

    handleNavigation()
  }, [initializeApp])

  useEffect(() => {
    handleScroll()

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [getScheduleInBackground])

  const isLoading =
    !isInitialized || status === REQUEST_STATUS.LOADING || !couple || couple?.length === 0

  return { isLoading }
}
