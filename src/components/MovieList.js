import React from "react";
import MovieCard from "./MovieCard";
import { useDispatch } from "react-redux";
import { addMainMovie } from "../utils/mainMovie";

const MovieList = ({ title, movies }) => {
  const dispatch = useDispatch();

  const handleMovieClick = (movie) => {
    dispatch(addMainMovie(movie));
  };
  return (
    movies && (
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        {/* Add `overflow-x-auto` and `flex-wrap` to allow horizontal scrolling */}
        <div className="flex overflow-x-auto flex-nowrap">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0"
              onClick={() => handleMovieClick(movie)}
            >
              <MovieCard posterPath={movie.poster_path} />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default MovieList;
