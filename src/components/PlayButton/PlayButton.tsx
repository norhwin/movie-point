import type { CSSProperties } from "react";
import styles from "./PlayButton.module.css"


type PlayButtonProps = {
    color?: string;
    onClick: () => void;
}
const PlayButton = ({color="#fff",onClick}:PlayButtonProps) => {

    const customColor ={"--play-color": color,} as CSSProperties;
  return (
    <button
    className={styles.playBtn}
    type="button"
    style={customColor}
    onClick={onClick}
    aria-label="воспроизвести">
        <span className={styles.rotatingArc}></span>
        <span className={styles.playCircle}>▶</span>

    </button>
  )
}

export default PlayButton
