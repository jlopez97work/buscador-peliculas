import { useState } from "react";
import "./style.css";
import RenderMovie from "./componets/RenderMovie";
import useMovies from "./hooks/useMovies";

const App = () => {
  const {
    movieToSearch,
    mappedMovies,
    handleChange,
    handleSubmit,
    sort,
    handleChangeSort,
  } = useMovies();

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Avengers, The kingdom, ..."
            onChange={handleChange}
            value={movieToSearch}
          />
          <button>Buscar</button>
        </form>
        <div className="sorter">
          <input type="checkbox" checked={sort} onChange={handleChangeSort} />
          <span>Ordenar Peliculas</span>
        </div>
      </header>
      <main>
        <RenderMovie movies={mappedMovies}></RenderMovie>
      </main>
    </div>
  );
};

export default App;
