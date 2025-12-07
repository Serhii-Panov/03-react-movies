import axios from "axios";
 ;
 const API_URL = "https://api.themoviedb.org/3/search/movie"
interface searchParams {
  params: {
    query: string,
    page?: number,
    limit?: number,
    perPage?: number
  },
  headers: {
    Authorization: string,
    Accept?: string
  }
}

export default function fetchMovies(searchParams: searchParams) {
  return axios.get(API_URL, {
    params: {
      query: searchParams.params.query,
      page: searchParams.params.page ?? 1,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      Accept: "application/json",
    },
  });
}
