import { useState } from "react"

import bg from "../../assets/images/bg-header.jpg"
import styles from "./Header.module.css"
import iconLogo from "../../assets/images/iconLogo.png"

type HeaderProps= {
  findText:string;
  setFindText: (value:string) => void;
}

const Header = ({findText,setFindText}:HeaderProps) => {
    const isSearching = findText.trim() !== "";
    const [name] = useState("Guest")
    const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div>
      <header className={`${styles.headerBG} ${isSearching ? styles.compact : ""}`} style={{'--bg-image' : `url(${bg})`} as React.CSSProperties}>
          <div className={styles.headerMain}>
            
            <div className={styles.headerLeft}>
              <img src={iconLogo} alt="icon" className={styles.headerIcon} />
              <h1 className={styles.headerName}>Movie Point</h1>
            </div>
            <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>☰</button>

            <div className={styles.headerRight}>
              <div className={styles.topRow}>
                <input className={styles.search} placeholder="Search" value={findText} onChange={(e) => setFindText(e.target.value)}/>
                
                <p className={styles.hiName}>Welcome {name}!</p>
              </div>

              <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
                <a href="#">Home</a>
                <a href="#">Movies</a>
                <a href="#">Celebrity List</a>
                <a href="#">Top Movies</a>
                <a href="#">News</a>
                <a href="#">Pages</a>
                <button className={styles.tickets}>Tickets</button>
              </nav>
            </div>

          </div>
        </header>
    </div>
  )
}

export default Header
