import styles from "./MovieCard.module.css"

type MovieCardProps = {
    nameFilm: string
    img: string
    voteCount: number
    stars: number
}

const MovieCard = ({ nameFilm, img, voteCount, stars }: MovieCardProps) => {

  const ratingPercent = Math.min(100, Math.max(0, (stars / 10) * 100))
  const formattedVotes = new Intl.NumberFormat("en", {
    notation:"compact",
    maximumFractionDigits: 1
  }).format(voteCount)

  return (
    <div className={styles.cardMovie}>
      <img src={img} alt={nameFilm} className={styles.imgCard} />
      <h3 className={styles.nameFilm}>{nameFilm}</h3>

      <div className={styles.rating}>
        <div className={styles.starsAll}>
          <span className={styles.starsGray}>
              {'★★★★★'}
          </span>
          <span className={styles.starsGold} style={{width: `${ratingPercent}%` }}>{'★★★★★'}</span>
          
        </div>
        <span className={styles.score}>{stars.toFixed(1)}</span>
        <span
           className={styles.rait}>{formattedVotes} voters
        </span>
      </div>
    </div>
  )
}

export default MovieCard
