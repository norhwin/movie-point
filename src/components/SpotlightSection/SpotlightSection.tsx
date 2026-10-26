import { useEffect, useMemo, useState } from "react";
import styles from "./SpotlightSection.module.css"
import MovieCard from "../MovieCard/MovieCard.tsx";
import { getPopularFilms, type MoviesFilm } from "../../data/filmsAPI.ts"
import SectionHeading from "../SectionHeading/SectionHeading.tsx";
import imgNoPoster from "../../assets/images/default.png"

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


    const [films, setFilms] = useState <MoviesFilm[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error,setError] = useState<string|null>(null)
      

    useEffect(()=>{
        setLoading(true);
        getPopularFilms()
            .then(setFilms)
            .catch((err)=>{
                console.error(err);
                setError("Не удалось загрузить запрос")
            })
            .finally(()=>{
                setLoading(false)
            })
        
    }, []);

 
  



    const [visibleFilms,setVisibleFilms] = useState<number>(8);
    const [activeTab,setActiveTab] = useState<Tab>(tabs[0]);
    const [newBatchStart, setNewBatchStart] = useState<number | null>(null);
    const [showMinFilms, setShowMinFilms] = useState<boolean>(false);
    


    const sortedFilms = useMemo(() => {
        const result = [...films];

        switch(activeTab){
            case tabs[0]:
                return result.sort((a,b) => b.popularity - a.popularity);
            case tabs[1]:
                return result.sort((a,b) => a.title.localeCompare(b.title, "ru"));
            case tabs[2]:
    
                return result.sort((a,b) => b.vote_average - a.vote_average);
            
            case tabs[3]:
            
                return result.sort((a,b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
            default:
                return result;
        }
    }, [activeTab, films]);

    

    const visibleCards = sortedFilms.filter(film =>
    film.title.toLowerCase().includes(findCard.toLowerCase())
    )

    const showMore = () =>{
        setNewBatchStart(visibleFilms);
        setVisibleFilms((prev) => Math.min(prev + 8, visibleCards.length));
    }

    const exitMoreShow = () =>{
        setShowMinFilms(true);

        setTimeout(()=> {
            setVisibleFilms(8);
            setNewBatchStart(null);
            setShowMinFilms(false);
        },500);
    }

    const cardsToHide = Math.max(visibleFilms - 8, 1)
    const cascadeDuratcion = 500;
    const animationDuraction = 300;
    const stepDelay = cardsToHide > 1 ? (cascadeDuratcion - animationDuraction) / cardsToHide -1 : 0;

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
                        {loading && <p>Загрузка фильмов...</p>}

                        {error && <p>{error}</p>}
                        <div className={styles.cardsFilm}>
                            {visibleCards.slice(0,visibleFilms).map((film,index) => {
                                const startCard = index>=8;
                                const isNew = newBatchStart !== null && index >= newBatchStart;  
                                                        
                                
                            return (
                                <div
                               
                                key={film.id}

                                className={startCard&&showMinFilms
                                                ? styles.cardDisappear 
                                                :isNew 
                                                    ? styles.cardAppear 
                                                    : ""}

                                style = {{
                                    animationDelay : 
                                        showMinFilms && startCard 
                                            ? `${(visibleFilms - index - 1 ) * stepDelay}ms`
                                            :isNew 
                                                ? `${(index - newBatchStart) * 60}ms` 
                                                : undefined
                                }}>
                                    
                                        
                                    
                                    <MovieCard 
                                        nameFilm={film.title} 
                                        img = {film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : imgNoPoster}
                                        views={film.popularity}
                                        stars={film.vote_average}
                                        />
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
