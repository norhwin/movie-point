
import { carouselCards } from "../../data/carouselCards"
import Carousel from "../Carousel/Carousel"
import FeaturedMovieCard from "../FeaturedMovieCard/FeaturedMovieCard"
import NewsSection from "../NewsSection/NewsSection"
import TrailerSection from "../TrailerSection/TrailerSection"
import styles from "./MainContent.module.css"
import img1 from "../../assets/images/3.jpg"
import SpotlightSection from "../SpotlightSection/SpotlightSection"

type MainContentProps = {
  findCard : string;
}

const MainContent = ({findCard}:MainContentProps) => {
  const isSearching = findCard.trim() !== "";
  return (
    <>
      <div className={styles.background}>
        

        <div className={styles.container}>
          
            <div className={`${styles.carouselWrap} ${isSearching ? styles.hidden : ""}`}>
              <div className={styles.carouselInner}>
                <div className={styles.upCarousel}>
                  <Carousel items={carouselCards} renderItem={(f) => <FeaturedMovieCard {...f} />} /> 
                </div>
              </div>
            </div>
            
          

          <div className={styles.spotlightThisMonth}>
            <img src={img1} alt="" className={styles.splashLeft} />
            <img src={img1} alt="" className={styles.splashRight} />
      
            <SpotlightSection findCard = {findCard} />
            
            
          </div> 

          <div className={styles.trailerSection}>
            <TrailerSection /> 
          </div>

          <div className={styles.latestNews}>
            <NewsSection />
          </div>



        </div>
      </div>
    </>
  )
}

export default MainContent
