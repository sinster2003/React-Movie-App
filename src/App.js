import { useState, useEffect } from "react";
import MovieCard from "./MovieCard.jsx";
import SearchIcon from "./search.svg";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${process.env.REACT_APP_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      searchMovies(searchMovie);
    }
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className="app">
      <h1 id="title">MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchMovie}
          onChange={(event) => {
            setSearchMovie(event.target.value);
          }}
          onKeyDown={handleEnter}
        />
        <img
          src={SearchIcon}
          alt="Search Icon"
          onClick={() => {
            searchMovies(searchMovie);
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.imdbID} />;
          })}
        </div>
      ) : (
        <div>
          <h1 id="notfound">No Movies Found</h1>
        </div>
      )}
    </div>
  );
};

export default App;
