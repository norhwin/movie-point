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
    page:number;
    results: MoviesFilm[];
    total_pages:number;
    total_results:number;
   
}

const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${APIToken}`
      }
    };

async function responseData(response:Response): Promise<MoviesResponse> {
  if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, body: ${text}`);
    }
    const data:MoviesResponse = await response.json();
    console.log(data.results);
    return data;
}
 

export async function getPopularFilms(page: number = 1): Promise<MoviesResponse> {
    if (!APIToken) {
      throw new Error("APIToken не задан");
    }
    
    const params = new URLSearchParams();

    params.set("language", "ru-RU");
    params.set("page", String(page));

   
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?${params}`,options);
    return responseData(response)
    
}

export async function searchFilm(query:string,page:number = 1):Promise<MoviesResponse> {
  if (!APIToken) {
      throw new Error("APIToken не задан");
    }
  const params = new URLSearchParams();

  params.set("query", query);
  params.set("language", "ru-RU");
  params.set("page", String(page));

  const response = await fetch(`https://api.themoviedb.org/3/search/movie?${params}`,options);

  return responseData(response);
  
}