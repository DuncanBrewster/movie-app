import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

import Movie from "./components/Movie";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6c0052a34b92712dfe2f93177f55c8b2&page=1";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=6c0052a34b92712dfe2f93177f55c8b2&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {  
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      

      setSearchTerm("");
    }
  }; 

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const goHome = (e) => {
    window.location.reload(false);
  }
  
    return (
      <>
        <header>
          <div onClick={goHome}>
            <FontAwesomeIcon icon ={faHome} className="home"></FontAwesomeIcon>
          </div>
          <form onSubmit={handleOnSubmit}>
            <input
            className="search" 
            type="search" 
            placeholder="Search"
            value={searchTerm}
            onChange={handleOnChange}
            />
          </form>         
        </header>

          <div className="movie-container">
          {movies.length > 0 && 
            movies.map((movie) => 
              <Movie key={movie.id} {...movie} />
          )}
        </div>
      </>
    );
}

export default App;

