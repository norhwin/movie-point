import MovieCard from "../../components/MovieCard/MovieCard"
import styles from "./Movie.module.css"
import { useEffect, useMemo, useRef, useState } from "react"
import { getFilms, searchFilm, type MoviesFilm } from "../../data/filmsAPI"
import SectionHeading from "../../components/SectionHeading/SectionHeading"
import { useNavigate } from "react-router-dom"
import imgNoPoster from "../../assets/images/poster.jpg"


type MovieProps ={
    findCard: string
}

const tabs = [
    { title: "Popular", category: "popular" },
    { title: "Coming Soon", category: "upcoming" },
    { title: "Now Playing", category: "now_playing" },
    { title: "Top Rated", category: "top_rated" }
] as const;

type Tab = typeof tabs[number];

const Movie = ({findCard}:MovieProps) => {
const [dataFilm,setDataFilm] = useState<MoviesFilm[]>([])
const [searchCard,setSearchCard] = useState<MoviesFilm[] | null>(null);

const [loading,setLoading] = useState(true);
const [error,setError] = useState<string | null>(null)
const navigate = useNavigate();
const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
const [page,setPage] = useState<number>(1); 
const [totalPage,setTotalPage] = useState<number|null>(null);

const [activeTab,setActiveTab] = useState<Tab>(tabs[0]);

const sentinelRef = useRef<HTMLDivElement|null>(null);  
const [loadingMore, setLoadingMore] = useState(false);
const [textEnding, setTextEnding] = useState<boolean>(false);
const [searching, setSearching] = useState(false);


useEffect(()=>{
    if(page>1) setLoadingMore(true);
    setError(null)
    let canceled = false;
    getFilms(activeTab.category, page)
    .then((data)=>{
        if (canceled) return;
        setTotalPage(data.total_pages)
        setDataFilm((old)=>
            page ===1? 
            data.results
            :[...old, ...data.results]
        )
    })
    .catch((err)=>{
        if (canceled) return;
        setError("Не удалось загрузить фильмы");
        console.error(err);
    })
    .finally(()=>{
        if (canceled) return;
        setLoading(false);
        setLoadingMore(false);
    })

    return ()=>{
        canceled=true;
    }
},[page,activeTab])

useEffect(()=> {
    const signal = new AbortController();
    setError(null);
    if (!findCard.trim()){
            setSearchCard(null);
            setSearching(false);
            return
   }
   setSearching(true);

   const timer = setTimeout(()=>{
    searchFilm(findCard,signal.signal)
    .then((data)=>{
        setSearchCard(data.results)
    })
    .catch((err)=>{
      if(err.name === "AbortError") return;
                console.error(err);
                setError("Не удалось выполнить поиск")
    })
    .finally(()=>{
                 if (!signal.signal.aborted){
                    setSearching(false);
                }
   })
    },500);

    return ()=>{
        signal.abort();
        clearTimeout(timer)
    }
    },[findCard]);

useEffect(() => {
    setPage(1);
    setDataFilm([]);
    setTotalPage(null);
}, [activeTab]);

useEffect(()=>{
    const el = sentinelRef.current
    if(!el){
        return
    }
    if(findCard.trim()) return;
    if(loadingMore) return;


    const observer = new IntersectionObserver(([entry])=>{
        if (entry.isIntersecting){
            if( totalPage!==null && page >= totalPage  ){
                setTextEnding(true);
                return
            }
            else{
                setPage((p) => p + 1);
            }

        }
    },{rootMargin:"200px"});

    observer.observe(el);
    return ()=>{
        observer.disconnect()
    }
},[totalPage, page, dataFilm.length, loading, loadingMore, findCard])




const sortedFilms = useMemo(() => {

        return (findCard&&searchCard ? [...searchCard] : findCard ? [ ] : [...dataFilm])

}, [dataFilm,searchCard, findCard]);



    

  return (
    <section className={styles.page}>
      

        

        <div className={styles.container}>
            {(loading || searching)  && ( 
                <div className={styles.status}>
                    <span className={styles.loader}></span>
                    Загрузка фильмов...
                </div>)}

                {error && (
                <div className={styles.error}>Ошибка: {error}</div>
            )}
            <SectionHeading title="MOVIE" >
                        <nav className={styles.tabs}>
                            {tabs.map((tab) => ( 
                                <button 
                                    key={tab.category}
                                    onClick={() => {
                                        if (tab === activeTab) return;
                                        setLoading(true);
                                        setTextEnding(false);
                                        setPage(1);
                                        setActiveTab(tab)}}
                                    className={tab === activeTab ? styles.tabActive : styles.tab}
                                    >
                                        {tab.title}
                                    </button>
                            ))}
                        </nav>
            </SectionHeading>
            {!loading && !searching && !error && sortedFilms.length === 0 && (
                <div className={styles.filmCantFind}>
                    Фильмы не найдены
                </div>
            )}
        <div className={styles.movieCards}>
                
                
                {sortedFilms.map((film,index)=>{
                    const isRef = (sortedFilms.length - 1  === index) 
                    
                    return (
                    
                    <div key={film.id} ref={isRef ? sentinelRef : null}> 
                
                    <MovieCard
                        
                        nameFilm={film.title} 
                        img= {film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : imgNoPoster}
                        voteCount={film.popularity} 
                        stars={film.vote_average} />
                    </div>
                    )
                })}
                
        </div>  
        {loadingMore && (
                <div className={styles.status}>
                    <span className={styles.loader}></span>
                    Загружаем ещё фильмы...
                </div>
            )}

            {textEnding && (
                <div className={styles.ending}>
                    <span>✦</span>
                    Вы посмотрели всё. Дальше живут драконы.
                </div>
            )}  
        </div>
    </section>
  )
}

export default Movie
