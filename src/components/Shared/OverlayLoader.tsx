import { FC } from 'react'

import { LoadingOverlay } from '@mantine/core'

export const OverlayLoader: FC = () => {
  return (
    <LoadingOverlay
      loaderProps={{ type: 'bars' }}
      overlayProps={{ blur: 1, radius: 'md', opacity: 0.6, fixed: true }}
      styles={{ root: { scrollbarGutter: 'auto' } }}
      visible
      zIndex={1000}
    />
  )
}
