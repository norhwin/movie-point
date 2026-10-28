const APIToken = import.meta.env.VITE_TMDB_TOKEN;

export type MoviesFilm = {
    title:string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path: string | null;
    id:number;
    
}

type MoviesResponse  ={
    results: MoviesFilm[]
}

const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${APIToken}`
      }
    };

async function responseData(response:Response): Promise<MoviesFilm[]> {
  if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, body: ${text}`);
    }
    const data:MoviesResponse = await response.json();

    return data.results 
}
 

export async function getPopularFilms(): Promise<MoviesFilm[]> {
    if (!APIToken) {
      throw new Error("APIToken не задан");
    }
  
   
    const response = await fetch("https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=1",options);
    return responseData(response)
    
}

export async function searchFilm(query:string):Promise<MoviesFilm[]> {
  if (!APIToken) {
      throw new Error("APIToken не задан");
    }
  const params = new URLSearchParams();

  params.set("query", query);
  params.set("language", "ru-RU");

  const response = await fetch(`https://api.themoviedb.org/3/search/movie?${params}`,options);

  return responseData(response);
  
}