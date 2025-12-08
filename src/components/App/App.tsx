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
  const closeModal = () => setIsModalOpen(false);
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
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        setIsError(true);
      });
  };

  const handleMovieSelectById = (id: number) => {
    // Находим ПОЛНЫЙ объект фильма из нашего текущего массива movies
    const movie = movies.find((m) => m.id === id);

    if (movie) {
      setSelectedMovie(movie);
      setIsModalOpen(true); // Открываем модальное окно
    } else {
      console.error("Фильм с таким ID не найден:", id);
      toast.error("Не удалось найти данные фильма.");
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
