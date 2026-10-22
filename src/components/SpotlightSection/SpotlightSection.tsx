import { useMemo, useState } from "react";
import styles from "./SpotlightSection.module.css"
import MovieCard from "../MovieCard/MovieCard";

import {films} from "../../data/films.ts"
import SectionHeading from "../SectionHeading/SectionHeading.tsx";

type SpotlightProps ={
    findCard: string
}

const tabs = [
    "Popular",
    "A-Z",
    "Top Rated",
    "Recently Released"
] as const;
type Tab = typeof tabs[number];



const SpotlightSection = ({findCard}:SpotlightProps) => {
const [visibleFilms,setVisibleFilms] = useState<number>(8);
const [activeTab,setActiveTab] = useState<Tab>(tabs[0]);
const [newBatchStart, setNewBatchStart] = useState<number | null>(null);
const [showMinFilms, setShowMinFilms] = useState<boolean>(false);


const sortedFilms = useMemo(() => {
    const result = [...films];

    switch(activeTab){
        case tabs[0]:
            return result.sort((a,b) => b.voters - a.voters);
        case tabs[1]:
            return result.sort((a,b) => a.nameFilm.localeCompare(b.nameFilm, "ru"));
        case tabs[2]:
   
            return result.sort((a,b) => b.stars - a.stars);
          
        case tabs[3]:
        
            return result.sort((a,b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
            
         
        
    }

}, [activeTab]);

const visibleCards = sortedFilms.filter(film =>
  film.nameFilm.toLowerCase().includes(findCard.toLowerCase())
)

const showMore = () =>{
    setNewBatchStart(visibleFilms);
    setVisibleFilms((prev) => Math.min(prev + 8, films.length));
}

const exitMoreShow = () =>{
    setShowMinFilms(true);
}


// }
  return (
    <section>
        
            <SectionHeading title="Spotlight This Month" >
                <nav className={styles.tabs}>
                    {tabs.map((tab) => ( 
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={tab === activeTab ? styles.tabActive : styles.tab}
                            >
                                {tab}
                            </button>
                    ))}
                </nav>
            </SectionHeading>
            
            
            
                <div className={styles.content}>
                    {visibleCards.length === 0 && <p>Ничего не найдено</p>}
                    <div className={styles.cardsFilm}>
                        {visibleCards.slice(0,visibleFilms).map((film,index) => {
                            const startCards = index >= 8;
                            const isNew = newBatchStart !== null && index >= newBatchStart;                            
                            
                           return (
                            <div
                            key={film.nameFilm}

                            className={[showMinFilms && startCards 
                                        ? styles.cardDisappear 
                                        : isNew 
                                            ? styles.cardAppear 
                                            : ""].join(" ")}    
                            style = {{
                                animationDelay : 
                                showMinFilms && startCards 
                                    ? `${(visibleFilms-(index - 1)) * 60}ms` 
                                    :isNew 
                                        ? `${(index - newBatchStart) * 60}ms` 
                                        : undefined
                            }}
                            
                            onAnimationEnd={event =>{
                                if(showMinFilms && startCards && index === 8 && event.target === event.currentTarget){
                                    setVisibleFilms(8);
                                    setNewBatchStart(null);
                                    setShowMinFilms(false);
                                }
                            }}>
                                <MovieCard nameFilm={film.nameFilm} img={film.img} views={film.voters} stars={film.stars} />
                            </div>
                        )})}
                    </div>

                    {visibleCards.length > 8 && (visibleFilms < visibleCards.length ? (
                    <button onClick={showMore} className={styles.btnMore}>
                        Показать еще
                    </button>
                    )
                    :
                    (
                    <button onClick={exitMoreShow} disabled={showMinFilms} className={styles.btnMore}>
                        Скрыть
                    </button>
                    ))

                }
                </div>  
        
    </section>
  )
}

export default SpotlightSection
