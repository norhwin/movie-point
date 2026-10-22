import styles from "./Footer.module.css"
import bg from "../../assets/images/bg-footer.jpg"
import logo from "../../assets/images/iconLogo.png"

const legal = ["Terms of Use", "Privacy Policy", "Security"]
const account = ["My Account", "Watchlist", "Collections", "User Guide"]

const Footer = () => {
  return (
    <footer
      className={styles.footer}
      style={{ '--bg-image': `url(${bg})` } as React.CSSProperties}
    >
      <div className={styles.container}>

        <div className={styles.columns}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <img src={logo} alt="logo" className={styles.logoImg} />
              <span className={styles.logoName}>Movie Point</span>
            </div>
            <p>7th Harley Place, London W1G 8LZ</p>
            <p>United Kingdom</p>
            <p>Call us: (+880) 111 222 3456</p>
          </div>

          <div className={styles.col}>
            <h4>Legal</h4>
            {legal.map((item) => (
              <a key={item} href="#">{item}</a>
            ))}
          </div>

          <div className={styles.col}>
            <h4>Account</h4>
            {account.map((item) => (
              <a key={item} href="#">{item}</a>
            ))}
          </div>

          <div className={styles.col}>
            <h4>Newsletter</h4>
            <p>Subscribe to our newsletter system now to get latest news from us.</p>
            <input type="email" placeholder="Enter your email..." className={styles.input} />
            <a href="#" className={styles.subscribe}>Subscribe now »</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2018 <span className={styles.accent}>MoviePoint</span>. All Rights Reserved.</p>
          <a href="#top">Back to top ↑</a>
        </div>

      </div>
    </footer>
  )
}

export default Footer