import React from 'react'
import styles from "./SectionBlock.module.css"
import SectionHeading from '../SectionHeading/SectionHeading';

type SectionBlockProps = {
    title: string;
    children: React.ReactNode;
}


const SectionBlock = ({title,children}:SectionBlockProps) => {
  return (
    <div className={styles.block}>
            <SectionHeading title={title}/>
            <div className={styles.content}>
                {children}
            </div>
    </div>
  )
}

export default SectionBlock
