import { useState } from "react"
import { trailer } from "../../data/trailer"
import styles from "./TrailerCards.module.css"

import ReactPlayer from 'react-player';
import Modal from "../Modal/Modal";


const TrailerBlock = () => {
    const [order,setOrder] = useState(trailer);

    const big = order[0];
    const side = order.slice(1,3);

    const swapWithBig = (index:number) => {
        const copy = [...order];
        let temp = copy[index];
        copy[index] = copy[0];
        copy[0] = temp; 
        setOrder(copy)
    }

    const next = () => setOrder((old)=> [...old.slice(1), old[0]] );

    const prev = () => setOrder((old)=> [old[old.length - 1], ...old.slice(0,-1)]);


    const [modalActive, setModalActive]= useState (false);

    
 
    return (
    <div>
        <div className={styles.blockTrailer}>
            
                <div className={styles.bigCard}>
                    
                    <img src={big.img} alt={big.name} />
                    <button
                        className={styles.playBtn}
                        type="button"
                        onClick={()=> setModalActive(!modalActive)}
                        aria-label="воспроизвести">
                            <span className={styles.rotatingArc}></span>
                            <span className={styles.playCircle}>▶</span>

                    </button>

                    
                    <div className={styles.navigation}>
                        <div className={styles.raiting}>
                            <h3 className={styles.nameBig}>{big.name}</h3>
                            
                            <span className={styles.stars}>{'★'.repeat(big.stars)}</span>
                        </div>
                    
                        <div className={styles.btnNavigation}>
                            <button className={styles.leftBtn} onClick={prev}>←</button>
                            <button className={styles.rightBtn} onClick={next}>→</button>
                        </div>
                    </div>
                    
                </div>


                <div className={styles.rightCards}>
                    {side.map((trailer,i) => (
                        <div
                        key={trailer.name}
                        className={styles.smallCard}
                        onClick={()=>swapWithBig(i+1)}
                        > 
                            <img src={trailer.img} alt={trailer.name} />
                        </div>
                    ))}
                </div>
                
            
            
        </div>

        {modalActive && ( 
            <div>
                
                <Modal active={modalActive} setActive={setModalActive} onNext={next} onPrev={prev}>
                    <ReactPlayer 
                        key={big.name}
                        light={big.img}
                        src="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
                        width="100%"    
                        height="400px"
                        className={styles.player} />
                </Modal>
                
                
            </div>
        )}
        
    </div>
  )
}

export default TrailerBlock
