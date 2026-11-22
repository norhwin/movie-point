import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieID, getMovieVideos, type MovieDetails } from "../../data/filmsAPI";
import styles from "./MoviePage.module.css"
import imgNoPoster from "../../assets/images/poster.jpg";
import { checkTrailers } from "../../data/getRandomTrailer";
import Modal from "../../components/Modal/Modal";

import ReactPlayer from 'react-player';

function formatRuntime(min: number | null): string {
    if (!min) return "";
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h ? `${h} ч ${m} мин` : `${m} мин`;
}

const MoviePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [trailerFilm,setTrailerFilm] = useState<string|null>(null)


    const [modalActive,setModalActive] = useState(false);

    useEffect(() => {
        const movieId = Number(id);
        if (Number.isNaN(movieId)) {
            setError("Неверный адрес фильма");
            setLoading(false);
            return;
        }

        let canceled = false;
        setLoading(true);
        setError(null);

        getMovieID(movieId)
            .then((data) => {
                if (canceled) return;
                setMovie(data);
            })
            .catch((err) => {
                if (canceled) return;
                console.error(err);
                setError("Не удалось загрузить фильм");
            })
            .finally(() => {
                if (canceled) return;
                setLoading(false);
            });

        return () => {
            canceled = true;
        };
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(()=>{
        let canceled = false;   
        setTrailerFilm(null);
        getMovieVideos(Number(id))
        .then((data)=>{
            if (canceled) return;
            const check = checkTrailers(data.results);
            if (check) setTrailerFilm(check.key);
        })
        .catch((err)=>{
            if (canceled) return;
            console.error(err)

        });
        return(()=>{
            canceled = true;
        })
    },[id])
    if (loading) return <div className={styles.status}>Загрузка...</div>;
    if (error) return <div className={styles.status}>Ошибка: {error}</div>;
    if (!movie) return <div className={styles.status}>Фильм не найден</div>;

    const year = movie.release_date.slice(0, 4);
    const runtime = formatRuntime(movie.runtime);

    return (
        
        <section className={styles.page}>
            {movie.backdrop_path && (
                <div
                    className={styles.hero}
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}
                />
            )}
            <div className={styles.container}>
                <button className={styles.back} onClick={() => navigate(-1)}>
                    ← Назад
                </button>

                <div className={styles.content}>
                    <img
                        className={styles.poster}
                        src={movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : imgNoPoster}
                        alt={movie.title}
                    />

                    <div className={styles.info}>
                        <h1 className={styles.title}>{movie.title}</h1>

                        <div className={styles.meta}>
                            {year && <span>{year}</span>}
                            {runtime && <span>{runtime}</span>}
                            <span className={styles.rating}>★ {movie.vote_average.toFixed(1)}</span>
                        </div>

                        <ul className={styles.genres}>
                            {movie.genres.map((g) => (
                                <li key={g.id} className={styles.genre}>{g.name}</li>
                            ))}
                        </ul>

                        <h2 className={styles.subtitle}>Описание</h2>
                        <p className={styles.overview}>
                            {movie.overview || "Описание пока отсутствует."}
                        </p>

                        
                    </div>
                    {trailerFilm && (
                        <div className={styles.trailerBlock}>
                            <h2 className={styles.sectionTitle}>Трейлер</h2>
                            <div className={styles.trailer}>
                                <img src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`: trailerFilm ? `https://img.youtube.com/vi/${trailerFilm}/hqdefault.jpg` : imgNoPoster} alt={movie.title} />
                                <button
                                className={styles.playBtn}
                                type="button"
                                onClick={()=> setModalActive(!modalActive)}
                                aria-label="воспроизвести">
                                <span className={styles.rotatingArc}></span>
                                <span className={styles.playCircle}>▶</span>
                                </button>

                            </div>
                        </div>
                    )}
                 
            </div>
        </div>

            {modalActive && ( 
                <div>
                    
                    <Modal active={modalActive} setActive={setModalActive}>
                        <ReactPlayer 
                            key={movie.id}
                            src={`https://www.youtube.com/watch?v=${trailerFilm}`}
                            width="100%"    
                            height="400px"
                            className={styles.player}
                            playing 
                            controls />
                            
                    </Modal>
                    
                    
            </div>)}
    </section>
    );
};

export default MoviePage;