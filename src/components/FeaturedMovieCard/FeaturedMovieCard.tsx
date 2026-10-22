
import styles from "./FeaturedMovieCard.module.css"
type FeaturedMovieCardProps = { 
      img: string
      nameFilm: string
      description: string
}

const FeaturedMovieCard = ({img,nameFilm,description}:FeaturedMovieCardProps ) => {
  return (
    <div className={styles.card}>
        <img className={styles.cardImage} src={img} alt={nameFilm} />
        
        <div className={styles.cardInfo}>
          <h1 className={styles.cardName}>{nameFilm}</h1>
          <p className={styles.info}>{description}</p>
        </div>
    </div>
  )
}

export default FeaturedMovieCard
