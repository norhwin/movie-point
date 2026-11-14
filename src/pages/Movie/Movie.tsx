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
    "Popular",
    "A-Z",
    "Top Rated",
    "Recently Released"
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
useEffect(()=>{
    getFilms("popular", page)
    .then((data)=>{
        setDataFilm((old)=>
            page ===1? 
            data.results
            :[...old, ...data.results]
        )
    })
    .catch((err)=>{
        setError("Не удалось загрузить фильмы");
        console.error(err);
    })
    .finally(()=>{
        setLoading(false);
    })
},[page])

useEffect(()=> {
    const signal = new AbortController();
    setError(null);
    if (!findCard.trim()){
            setSearchCard(null);
            return
   }
   setLoading(true);

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
                    setLoading(false);
                }
   })
    },500);

    return ()=>{
        signal.abort();
        clearTimeout(timer)
    }
    },[findCard]);


const [activeTab,setActiveTab] = useState<Tab>(tabs[0]);


const sortedFilms = useMemo(() => {

        const result = (findCard&&searchCard ? [...searchCard] : findCard ? [ ] : [...dataFilm])

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
    }, [activeTab, dataFilm,searchCard, findCard]);


   
if (loading) return <div>Загрузка фильмов...</div>;
if (error) return <div>Ошибка: {error}</div>;
if (sortedFilms.length === 0) return <div>фильмы не найдены</div>;
  return (
    <div>
        <SectionHeading title="MOVIE" >
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
      <div className={styles.movieCards}>
            {sortedFilms.map((film)=>{
                
                return <MovieCard
                key={film.id}
                nameFilm={film.title} 
                img= {film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : imgNoPoster}
                voteCount={film.popularity} 
                stars={film.vote_average} />
            })}
            
      </div>
      <button type="button" onClick={() => setPage((p) => p + 1)}>
             Загрузить ещё
    </button>       
    </div>
  )
}

export default Movie
