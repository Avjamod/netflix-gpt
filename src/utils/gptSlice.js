import { createSlice } from "@reduxjs/toolkit";

const gptSearch = createSlice({
  name: "gpt",
  initialState: { showGptSearch: false, movieNames: [], moviesData: [] },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addgptMovieResult: (state, action) => {
      const { movieNames, moviesData } = action.payload;
      state.movieNames = movieNames;
      state.moviesData = moviesData;
    },
  },
});

export default gptSearch.reducer;
export const { toggleGptSearchView, addgptMovieResult } = gptSearch.actions;
