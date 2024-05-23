import { LoadingOverlay } from '@mantine/core'

export const LoaderOverlay = () => {
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
