import React from 'react'
import styles from './Button.module.scss'

function Button({text}) {
  return (
    <button className={styles['button']}>{text}</button>
  )
}

export default Button
