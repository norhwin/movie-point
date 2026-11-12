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

export type MoviesResponse  ={
    page:number;
    results: MoviesFilm[];
    total_pages:number;
    total_results:number;
   
}

export type MovieCategory =
    | "popular"
    | "upcoming"
    | "now_playing"
    | "top_rated";

export type MovieVideo = {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
    official: boolean;
}

export type MovieVideosResponse = {
    id: number;
    results: MovieVideo[];
}

const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${APIToken}`
      }
    };

async function responseData<T>(response:Response): Promise<T> {
  if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, body: ${text}`);
    }
    const data: T = await response.json();
    return data;
}
 

export async function getFilms(category:MovieCategory, page: number = 1): Promise<MoviesResponse> {
    if (!APIToken) {
      throw new Error("APIToken не задан");
    }
    
    const params = new URLSearchParams();

    params.set("language", "ru-RU");
    params.set("page", String(page));

   
    const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?${params}`,options);
    return responseData(response)
    
}

export async function searchFilm(query:string, signal?: AbortSignal,page:number = 1 ):Promise<MoviesResponse> {
  if (!APIToken) {
      throw new Error("APIToken не задан");
    }
  const params = new URLSearchParams();

  params.set("query", query);
  params.set("language", "ru-RU");
  params.set("page", String(page));

  const response = await fetch(`https://api.themoviedb.org/3/search/movie?${params}`, {...options,signal});

  return responseData<MoviesResponse>(response);
  
}


export async function getMovieVideos(movieId: number): Promise<MovieVideosResponse> {

    if (!APIToken) {
        throw new Error("APIToken не задан");
    }

    const params = new URLSearchParams();

    params.set("language","ru-RU");
    params.set("include_video_language", "ru,en,null");

    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?${params}`,{...options})

    return responseData<MovieVideosResponse>(response)
 
}
