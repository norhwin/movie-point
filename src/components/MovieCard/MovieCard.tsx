import styles from "./MovieCard.module.css"

type MovieCardProps = {
    nameFilm: string
    img: string
    views: number
    stars: number
}

const MovieCard = ({ nameFilm, img, views, stars }: MovieCardProps) => {
  return (
    <div className={styles.cardMovie}>
      <img src={img} alt={nameFilm} className={styles.imgCard} />
      <h3 className={styles.nameFilm}>{nameFilm}</h3>
      <div className={styles.rating}>
        <span className={styles.stars}>
            {'★'.repeat(Math.round(stars))}
        </span>
        <span className={styles.rait}>{views}k voters</span>
      </div>
    </div>
  )
}

export default MovieCard
