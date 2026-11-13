
import { getFilms, getMovieVideos, type MovieVideo,} from "./filmsAPI";


function shuffle<T>(arr:T[]): T[]{
    const copy = [...arr];

    for (let i= copy.length - 1; i > 0;i--){
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy
}

function checkTrailers(condidats:MovieVideo[]): MovieVideo | undefined{
    const youtube = condidats.filter(condidat => condidat.site === "YouTube");

    return (
        youtube.find(v=> v.type === "Trailer" && v.official) ??
        youtube.find(v=> v.type === "Trailer") ??
        youtube[0]
    )
}

export type TrailerItem = {
    id: number;
    name: string;
    stars: number;
    img: string;
    key: string;
};


export async function getRandomTrailer(count:number):Promise<TrailerItem[]> {
    const {results:movie} = await getFilms("popular",2);
    const shuffleFilm = shuffle(movie.filter(v => v.poster_path)).slice(0,count * 2);
    const witchTrailer = await Promise.all(
        shuffleFilm.map(async film =>
            {
                try{
        
            const {results:video} = await getMovieVideos(film.id);
            const trailer = checkTrailers(video);
            return trailer ? {film,trailer} : null;
                }
                catch{
                    return null;
                }
        })
    )

    return witchTrailer
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .slice(0,count)
    .map(({film,trailer})=>({
        id: film.id,
        name:film.title,
        stars: film.vote_average,
        img: `https://image.tmdb.org/t/p/w780${film.poster_path}`,
        key: trailer.key
    }));
    
}