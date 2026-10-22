import React from 'react'
import styles from "./SectionHeading.module.css"

type SectionHeadingProps = {
    title: string;
    children?: React.ReactNode;
}

const SectionHeading = ({title, children}: SectionHeadingProps) => {
  return (
    <div className={styles.head}>

        <h2 className={styles.title}>{title}</h2>

        {children}


    </div>
  )
}

export default SectionHeading
