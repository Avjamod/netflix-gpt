import { useEffect } from "react";
import { OPTIONS_API } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const useGetMovieVideos = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  useEffect(() => {
    !trailerVideo && fetchMovieVideos();
  }, []);

  const fetchMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      OPTIONS_API
    );

    const json = await data.json();

    const filterData = json?.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailerVideo = filterData ? filterData[0] : json?.results[0];
    dispatch(addTrailerVideo(trailerVideo));
  };
};

export default useGetMovieVideos;
