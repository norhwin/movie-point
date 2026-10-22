import styles from "./NewsCard.module.css"

export type NewsCardProps = {
  title: string
  text: string
  img: string
  date: Date
  link: string
}

const NewsCard = ({ title, text, img, date, link }: NewsCardProps) => {
  const month = date.toLocaleDateString("en-US", { month: "short" })
  const day = date.getDate()
  const year = date.getFullYear()

  return (
    <article className={styles.card}>
      <img src={img} alt={title} className={styles.bg} />

      <div className={styles.date}>
        <span className={styles.monthDay}>{month} {day}</span>
        <span className={styles.year}>{year}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.text}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.desc}>{text}</p>
        </div>
        <a href={link} className={styles.more}>Read More »</a>
      </div>
    </article>
  )
}

export default NewsCard