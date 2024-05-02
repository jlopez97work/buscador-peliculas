import React, { useState, useRef, useMemo, useCallback } from "react";
import debounce from "just-debounce-it";

const API_MOVIES_BASE = "https://www.omdbapi.com/?apikey=b4de7c8b&s=";

const useMovies = () => {
  const [movieToSearch, setMovieToSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [sort, setSort] = useState(false);
  const previusSearch = useRef(movieToSearch);

  const handleChangeSort = () => {
    setSort(!sort);
  };

  const debounceGetMovies = useCallback(
    debounce((newSearch) => {
      getMovies(newSearch);
    }, 300),
    []
  );

  const mappedMovies = movies.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
    type: movie.Type,
  }));

  const sortedMovies = useMemo(() => {
    return sort
      ? [...mappedMovies].sort((a, b) => a.title.localeCompare(b.title))
      : mappedMovies;
  }, [sort, movies]);

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setMovieToSearch(newSearch);
    debounceGetMovies(newSearch);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    getMovies(movieToSearch);
  };

  const getMovies = async (movieToSearch) => {
    if (previusSearch.current === movieToSearch && movieToSearch != "") return;
    if (movieToSearch != "") {
      const result = await fetch(`${API_MOVIES_BASE}${movieToSearch}`);
      const data = await result.json();
      previusSearch.current = movieToSearch;
      if (data.Search) setMovies(data.Search);
    } else {
      alert("Entre la pelicula a buscar");
    }
  };

  return {
    movieToSearch,
    mappedMovies: sortedMovies,
    handleChange,
    handleSubmit,
    sort,
    handleChangeSort,
  };
};

export default useMovies;
