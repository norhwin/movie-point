import { useState } from 'react'
import styles from "./Carousel.module.css"





type CarouselProps<T> = {
    items: T[];
    renderItem: (item:T) => React.ReactNode; 
}


const Carousel = <T,>({items,renderItem}: CarouselProps<T>) => {
    
    const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * items.length));
    const Next = () => {
        setCurrentIndex(i => (i + 1 ) % items.length);
    }

    const Prev = () => {
        setCurrentIndex(i => (i - 1 + items.length) % items.length);
    }

  return (
    <div className={styles.carousel}>
        <div className={styles.cardsAll}>

           {items.map((item,index)=>{
                const position = (index - currentIndex + items.length ) % items.length;

                let className = styles.hiddenCard;

                if (position === 0){
                    className = styles.midleCard;
                }else if (position === 1){
                    className = styles.rightCard;
                }else if (position === items.length - 1){
                    className = styles.leftCard;
                }else if (position === 2){
                    className = styles.hiddenRightCard;
                }else if (position === items.length - 2){
                    className = styles.hiddenLeftCard;
                }

                return (
                    <div className={className} key={index}>
                        {renderItem(item)}
                    </div>
                )
            })}
            <button onClick={Prev} className={styles.leftBtn}>{"<"}</button>
            <button onClick={Next} className={styles.rightBtn}>{">"}</button>
        
         </div>
        
    </div>
  )
}

export default Carousel
