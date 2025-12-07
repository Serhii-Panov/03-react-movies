import { useState } from "react";
import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

function App() {
  const [movies, setMovies] = useState([]);

  const handleSearch = (query: string) => {
    const params = {
      params: { query },
      headers: { Authorization: "", Accept: "application/json" },
    };
    fetchMovies(params)
      .then((res) => {
        if (res.data.results.length === 0) {
          toast.error("No movies found for your request");
          setMovies([]);
        } else {
          setMovies(res.data.results);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("There was an error, please try again...");
      });
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      <MovieGrid movies={movies} onSelect={(movieId) => {}} />
    </div>
  );
}

export default App;
