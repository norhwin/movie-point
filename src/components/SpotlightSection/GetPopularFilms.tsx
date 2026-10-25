
import { useEffect,useState } from "react"
import { getPopularFilms, type MoviesFilm } from "../../data/filmsAPI copy"
import MovieCard from "../MovieCard/MovieCard";




const GetPopularFilms = () => {

    const [films, setFilms] = useState<MoviesFilm[]>([]);

    useEffect(() => {
        getPopularFilms()
        .then(setFilms)
        .catch(console.error)
    
    }, []);
  return (
     <div>
      {films.map((movie) => (
        
        <MovieCard key={movie.id} nameFilm={movie.title} img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} views={movie.vote_average} stars={movie.vote_average} /> ))}
    </div>
  )
}

export default GetPopularFilms


