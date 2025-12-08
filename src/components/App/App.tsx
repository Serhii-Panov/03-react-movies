import { useState } from "react";
import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(
    undefined
  );
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(undefined);
  };
  const handleSearch = (query: string) => {
    const params = {
      params: { query },
      headers: { Authorization: "", Accept: "application/json" },
    };
    setIsLoading(true);
    fetchMovies(params)
      .then((res) => {
        if (res.data.results.length === 0) {
          setIsLoading(false);
          toast.error("No movies found for your request");
          setMovies([]);
        } else {
          setIsLoading(false);
          setMovies(res.data.results);
          setIsError(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        setIsError(true);
      });
  };

  const handleMovieSelectById = (id: number) => {
    const movie = movies.find((m) => m.id === id);

    if (movie) {
      setSelectedMovie(movie);
      openModal();
    } else {
      console.error("Error movie with this id not found", id);
      toast.error("Error: Movie not found");
    }
  };
  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isloading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieGrid movies={movies} onSelect={handleMovieSelectById} />
      {isModalOpen && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
}

export default App;
