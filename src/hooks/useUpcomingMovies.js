import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPTIONS_API } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  useEffect(() => {
    !upcomingMovies && fetchUpcomingMovies();
  }, []);

  const fetchUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?&page=1",
      OPTIONS_API
    );
    const json = await data.json();
    console.log(json);
    dispatch(addUpcomingMovies(json.results));
  };
};

export default useUpcomingMovies;
