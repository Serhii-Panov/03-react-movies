import { useState } from "react";
import css from "/App.module.css";

function App() {
  const [movies, setMovies] = useState([]); // State for movies

  const handleSearch = (query: string) => {
    const params = {
      params: { query },
      headers: { Authorization: "", Accept: "application/json" },
    };
    const onSelect = (movieId: number) => {
      console.log("Selected movie ID:", movieId);
    };
    searchMovies(params)
      .then((res) => {
        if (res.data.results.length === 0) {
          toast.error("No movies found for your request");
          setMovies([]); // Clear movies if none found
        } else {
          setMovies(res.data.results); // Set movies state
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
      {movies.length > 0 && ( // Conditionally render MovieGrid
        <MovieGrid movies={movies} />
      )}
    </div>
  );
}

export default App;
