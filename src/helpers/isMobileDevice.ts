export const isMobileDeviceByWidth = (): boolean => {
  const screenWidth: number =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

  return screenWidth <= 768
}
