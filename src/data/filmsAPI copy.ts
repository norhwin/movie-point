const APIToken = import.meta.env.VITE_TMDB_TOKEN;

export type MoviesFilm = {
    title:string;
    overview: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
    id:number;
}

type MoviesResponse  ={
    results: MoviesFilm[]
}

const url = "https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=1";

export async function getPopularFilms(): Promise<MoviesFilm[]>{
    if (!APIToken) {
      throw new Error("APIToken не задан");
    }
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${APIToken}`
      }
    };
    const response = await fetch(url,options);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, body: ${text}`);
    }
    const data:MoviesResponse = await response.json();

    return data.results 
}

