import React from "react";
import { useSelector } from "react-redux";
import ShimmerUI from "./ShimmerUI";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const { movieNames, moviesData } = useSelector((store) => store.gpt);
  if (!movieNames) return <ShimmerUI />;

  return !movieNames ? (
    " "
  ) : (
    <div className="p-4 m-4 bg-black text-white bg-opacity-80">
      {movieNames.map((moviename, index) => (
        <MovieList
          key={moviename}
          title={movieNames[index]}
          movies={moviesData[index]}
        />
      ))}
    </div>
  );
};

export default GptMovieSuggestion;
