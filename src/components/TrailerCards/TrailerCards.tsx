import { useEffect, useState } from "react"

import styles from "./TrailerCards.module.css"

import ReactPlayer from 'react-player';
import Modal from "../Modal/Modal";
import { getRandomTrailer,  type TrailerItem } from "../../data/getRandomTrailer";



const TrailerBlock = () => {
    const [order,setOrder] = useState<TrailerItem[]>([]);
    const [error,setError] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalActive, setModalActive]= useState (false);

 useEffect(() => {
    getRandomTrailer(3)
    .then(setOrder)
    .catch((err)=>{
        console.error(err);
        setError("Не удалось загрузить запрос")
    })
    .finally(()=>{
        setLoading(false)
    })
}, []);
    
    if (loading) return <div>Загрузка трейлеров...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (order.length === 0) return <div>Трейлеры не найдены</div>;

    

    const big = order[0];
    const side = order.slice(1,3);

    const ratingPercent = Math.min(100, Math.max(0, (big.stars / 10) * 100))


    const swapWithBig = (index:number) => {
        const copy = [...order];
        let temp = copy[index];
        copy[index] = copy[0];
        copy[0] = temp; 
        setOrder(copy)
    }

    const next = () => setOrder((old)=> [...old.slice(1), old[0]] );

    const prev = () => setOrder((old)=> [old[old.length - 1], ...old.slice(0,-1)]);


    
    
 
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
                            
                            <div className={styles.starsScore}>
                                <div className={styles.starsAll}>
                                    <span className={styles.starsGray}>★★★★★</span>
                                    <span
                                        className={styles.starsGold}
                                        style={{ width: `${ratingPercent}%` }}
                                    >
                                        ★★★★★
                                    </span>
                                </div>

                                <span className={styles.score}>
                                    {(big.stars.toFixed(1))}
                                </span>
                            </div>
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
                        key={trailer.id}
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
                        key={big.id}
                        light={big.img}
                        src={`https://www.youtube.com/watch?v=${big.key}`}
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
