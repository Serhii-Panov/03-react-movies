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
  }
}

export default function fetchMovies(query: searchParams) {
    return axios.get(API_URL, query);
}