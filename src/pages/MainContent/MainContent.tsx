
import Carousel from "../../components/Carousel/Carousel"
import FeaturedMovieCard from "../../components/FeaturedMovieCard/FeaturedMovieCard"
import NewsSection from "../../components/NewsSection/NewsSection"
import TrailerSection from "../../components/TrailerSection/TrailerSection"
import styles from "./MainContent.module.css"
import img1 from "../../assets/images/3.jpg"
import SpotlightSection from "../../components/SpotlightSection/SpotlightSection"
import { useEffect, useState } from "react"
import { getFilms, type MoviesFilm } from "../../data/filmsAPI"
import imgNoPoster from "../../assets/images/default.png"
import { formatDate } from "../../utils/formatDate"


type MainContentProps = {
  findCard : string;
}

const MainContent = ({findCard}:MainContentProps) => {
  const isSearching = findCard.trim() !== "";

  const [upcomingFilms,setUpcomingFilms] = useState<MoviesFilm[]>([]);
  const [error,setError] = useState <string|null>(null); 
  const [loading,setLoading] = useState<boolean>(true);

  useEffect(()=>{
    getFilms("upcoming")
    .then((data)=>{
      setUpcomingFilms(data.results)
    })
    .catch(err =>{
      console.error(err);
      setError("Не удалось загрузить предстоящие фильмы");
    })
    .finally(()=>{
      setLoading(false);
    })
    
  },[]);

  
  return (
    <>
      <div className={styles.background}>
        

        <div className={styles.container}>
          
            <div className={`${styles.carouselWrap} ${isSearching ? styles.hidden : ""}`}>
              <div className={styles.carouselInner}>
                <div className={styles.upCarousel}>
                  <Carousel items={upcomingFilms} 
                  renderItem={(film) => 
                  <FeaturedMovieCard 
                    nameFilm={film.title} 
                    description={film.overview} 
                    img={film.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${film.poster_path}` 
                      : imgNoPoster}
                    releaseDate ={formatDate(film.release_date)}
                    />
                  } 
                    loading={loading} /> 
                    
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
