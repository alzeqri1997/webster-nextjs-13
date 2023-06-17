import React from 'react'
import Link from 'next/link'
import styles from './button.module.css'

type PropTypes = {
    text: string,
    url: string
}

const Button = ({text, url}: PropTypes) => {
  return (
    <Link href={url}>
        <button className={styles.container} >{text}</button>
    </Link>
  )
}

export default Button