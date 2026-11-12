
import { getFilms, getMovieVideos, type MoviesFilm, type MoviesResponse, type MovieVideo, type MovieVideosResponse } from "./filmsAPI";

function shuffle<T>(arr:T[]): T[]{
    const copy = [...arr];

    for (let i= copy.length - 1; i > 0;i--){
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy
}

function checkTrailers(condidats:MovieVideo[]): MovieVideo | undefined{
    return condidats.find(condidat => condidat.site === "YouTube" && condidat.type === "Trailer");

}

export type TrailerItem = {
    id: number;
    name: string;
    stars: number;
    img: string;
    key: string;
};


export async function getRandomFilm(): Promise<MoviesFilm[]>{
    const {results: trailerFilms} =await getFilms("popular");
    const condidats = shuffle(trailerFilms).slice(0,6);
    return condidats
} 

export async function  getTrailers():Promise<TrailerItem[]> {
    const films = await getRandomFilm();
    const items = await Promise.all(
    films.map(async (film)=>{
        const {results} = await getMovieVideos(film.id);
        const trailer = checkTrailers(results);
        if(!trailer) return null;

        return {id: film.id,
            name:film.title,
            stars: film.vote_average,
            img: `https://image.tmdb.org/t/p/w780${film.poster_path}`,
            key:trailer.key} 
    })
)
   const ready = items.filter((item): item is TrailerItem => item !== null);
   return ready
}

