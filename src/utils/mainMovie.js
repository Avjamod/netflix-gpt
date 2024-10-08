import { createSlice } from "@reduxjs/toolkit";

const mainmoviesSlice = createSlice({
  name: "main-movies",
  initialState: null,
  reducers: {
    addMainMovie: (state, action) => {
      state.mainMovie = action.payload;
    },
  },
});

export const { addMainMovie } = mainmoviesSlice.actions;
export default mainmoviesSlice.reducer;
