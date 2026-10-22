
import styles from "./TrailerSection.module.css"
import TrailerCards from '../TrailerCards/TrailerCards'

import SectionBlock from "../SectionBlock/SectionBlock"

const TrailerSection = () => {
  return (
    <section className={styles.TrailerSection}> 

      <SectionBlock title="Trailers & Videos">

        <TrailerCards/>

      </SectionBlock>
    </section>
  )
}

export default TrailerSection
