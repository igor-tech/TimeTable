import { useState } from 'react'

import { TbGhost } from 'react-icons/tb'

import styles from './AnimatedIcon.module.css'

export const AnimatedIcon = () => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(!isClicked)

    setTimeout(() => setIsClicked(false), 500)
  }

  return (
    <div
      className={`${styles.icon} ${isClicked ? styles.enlarged : ''}`}
      onClick={handleClick}
      style={{ color: isClicked ? '#4dabf7' : 'inherit' }}
    >
      <TbGhost size={'2.5rem'} />
    </div>
  )
}
