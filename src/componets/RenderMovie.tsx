import React from "react";

const RenderMovie = ({ movies }) => {
  return (
    <ul className="movies">
      {movies.length == 0 ? (
        <p>Los resultados se mostraran aqui</p>
      ) : (
        movies.map((movie) => (
          <li className="movie" key={movie.id}>
            <h3>
              {movie.title} - {movie.year}
            </h3>
            <img src={movie.poster} alt={movie.title} />
          </li>
        ))
      )}
    </ul>
  );
};

export default RenderMovie;
