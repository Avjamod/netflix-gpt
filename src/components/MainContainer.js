import React from "react";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  const movie = useSelector((store) => store?.mainMovie?.mainMovie);
  if (!movies) return;
  console.log(movie);
  const mainMovie = movies[5];

  return (
    <div className="">
      <VideoTitle title={mainMovie.title} overview={mainMovie.overview} />
      <VideoBackground movieId={mainMovie?.id} />
    </div>
  );
};

export default MainContainer;
