import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPTIONS_API } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const popularMovies = useSelector((store) => store.movies.popularMovies);

  useEffect(() => {
    !popularMovies && fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?&page=1",
      OPTIONS_API
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };
};

export default usePopularMovies;
