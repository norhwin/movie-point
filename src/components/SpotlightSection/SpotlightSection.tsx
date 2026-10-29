import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./SpotlightSection.module.css"
import MovieCard from "../MovieCard/MovieCard.tsx";
import { getPopularFilms, searchFilm, type MoviesFilm } from "../../data/filmsAPI.ts"
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
    const [loading, setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string|null>(null)
    const [searchCard,setSearchCard] = useState<MoviesFilm[] | null>(null);

    const [page,setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);


    useEffect(()=>{
        getPopularFilms(page)
            .then((data) => {
                setFilms((prev) =>
                    page === 1 
                        ? data.results
                        : [...prev, ...data.results]
                );
                
                setTotalPages(data.total_pages);
            })
            .catch((err)=>{
                console.error(err);
                setError("Не удалось загрузить запрос")
            })
            .finally(()=>{
                setLoading(false)
            })
        
    }, [page]);

   


    useEffect(()=>{
         if (loading){
            setLoading(false);
        }

        if (!findCard.trim()){
            setSearchCard(null);
            return

        }
       
        setLoading(true);

        const timer = setTimeout(()=>{    
            searchFilm(findCard,page)
            .then((data) =>{
                setSearchCard((prev) =>
                    page === 1 
                        ? data.results
                        : [...(prev ?? []), ...data.results]
                );
                setTotalPages(data.total_pages);
            })
            .catch((err)=>{
                console.error(err);
                setError("Не удалось выполнить поиск")
            })
            .finally(()=>{
                setLoading(false);
            })
            
            
        },500);
        

        return () =>{
            clearTimeout(timer);
        }
    },[findCard,page]);

    
    

    const limit = 8;
    const [visibleFilms,setVisibleFilms] = useState<number>(limit);
    const [activeTab,setActiveTab] = useState<Tab>(tabs[0]);
    const [newBatchStart, setNewBatchStart] = useState<number | null>(null);
    const [showMinFilms, setShowMinFilms] = useState<boolean>(false);
    
    

    const sortedFilms = useMemo(() => {

        const result = (findCard&&searchCard ? [...searchCard] : findCard ? [ ] : [...films])

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
    }, [activeTab, films,searchCard, findCard]);

    

   
    const visibleCards = sortedFilms;

    
   
    

    const showMore = () =>{
        setNewBatchStart(visibleFilms);
        setVisibleFilms((prev) => Math.min(prev + limit, visibleCards.length));
    }

    const exitMoreShow = () =>{
        setShowMinFilms(true);

        if (timerRef.current !== null ){
            clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(()=> {
            setVisibleFilms(limit);
            setNewBatchStart(null);
            setShowMinFilms(false);

            timerRef.current = null;
        },cascadeDuratcion);
    }

    useEffect(()=>{
        return () => {
            if (timerRef.current !== null ){
                clearTimeout(timerRef.current)
                timerRef.current = null;
            }
        }
    },[]) 

    const cardsToHide = Math.max(visibleFilms - limit, 1)
    const cascadeDuratcion = 500;
    const animationDuration  = 300;
    const stepDelay = cardsToHide > 1 ? (cascadeDuratcion - animationDuration) / (cardsToHide -1) : 0;

    

    

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
                
                
                
                    <div className={styles.content} style={{'--animationDuration' : `${animationDuration}ms`} as React.CSSProperties}>
                        {loading && <p>Загрузка фильмов...</p>}

                        {error && <p>{error}</p>}

                        {!loading && !error && visibleCards.length === 0 && <p> Ничего не найдено</p> }
                        <div className={styles.cardsFilm}>
                            {visibleCards.slice(0,visibleFilms).map((film,index) => {
                                const startCard = index>=limit;
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

                        {visibleCards.length > limit && 
                        (visibleFilms < visibleCards.length 
                            ? (
                            <button onClick={showMore} className={styles.btnMore}>
                                Показать еще
                            </button>
                            )
                            :(
                            <div>
                                
                                <button onClick={exitMoreShow} disabled={showMinFilms} className={styles.btnMore}>
                                    Скрыть
                                </button>
                                <button onClick={() => setPage((next) => next + 1)} disabled={loading} className={styles.nextPage}> {">"} </button>
                            </div>
                            ))
                            

                    }
                    </div>  
            
        </section>
    )
    }

    export default SpotlightSection
