import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";
import mainmovieReducer from "./mainMovie";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    mainmovie: mainmovieReducer,
    gpt: gptReducer,
    config: configReducer,
  },
});

export default appStore;
