import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesReducer";
import genresReducer from "./genresReducer";
import singleGameReducer from "./singleGameReducer";
import singleGenreReducer from "./singleGenreReducer";

const reducer = {
    genres: genresReducer,
    games: gamesReducer,
    singleGame: singleGameReducer,
    singleGenre: singleGenreReducer
}

const store = configureStore({reducer})

export default store;