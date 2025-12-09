import axios from "axios";
import type { Movie } from "../types/movie";
 const API_URL = "https://api.themoviedb.org/3/search/movie"

export default function fetchMovies(query: string) {
  const response = axios.get(API_URL, {
    params: {
      query: query,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      Accept: "application/json",
    },
  });
  return response.then((res) => res.data as { results: Movie[] } );
}
