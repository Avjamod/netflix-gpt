import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondoryContainer = () => {
  const movies = useSelector((store) => store.movies);
  if (!movies) return;

  return (
    <div className="bg-black  text-white">
      <div className="-mt-48 pl-10 relative z-20">
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Top Rated"} movies={movies?.topRatedMovies} />

        <MovieList title={"Popular"} movies={movies?.popularMovies} />
        <MovieList title={"Upcoming"} movies={movies?.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondoryContainer;
