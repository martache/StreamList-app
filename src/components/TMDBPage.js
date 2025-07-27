import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../api/tmdb';

const TMDBPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies().then(setMovies);
  }, []);

  return (
    <div>
      <h2>Popular Movies</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.title} ({movie.release_date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TMDBPage;
