import NewsCard from "../NewsCard/NewsCard"
import SectionBlock from "../SectionBlock/SectionBlock"
import styles from "./NewsSection.module.css"
import {news} from "../../data/newsList"
import Carousel from "../Carousel/Carousel"

const NewsSection = () => {
  return (
    <section>
        <SectionBlock title="Latest News">
            <div className={styles.content}>
                <Carousel items={news} renderItem={(n) => <NewsCard {...n} />} /> 
            </div>
        </SectionBlock> 
        
    </section>
  )
}

export default NewsSection
