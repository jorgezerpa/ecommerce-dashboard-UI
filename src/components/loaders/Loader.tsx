import React from 'react'
import styles from '../../styles/loader.module.css'

export const Loader = () => {
  return (
        <div className={styles['lds-spinner']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  )
}
