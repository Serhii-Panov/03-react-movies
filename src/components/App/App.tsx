import { useState } from "react";
import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);

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
        toast.error("There was an error, please try again...");
      });
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isloading && <Loader />}
      <MovieGrid movies={movies} onSelect={(movieId) => {}} />
    </div>
  );
}

export default App;
