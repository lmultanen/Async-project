import { configureStore } from "@reduxjs/toolkit";
import consolesReducer from "./consolesReducer";
import gamesReducer from "./gamesReducer";
import genresReducer from "./genresReducer";
import singleConsoleReducer from "./singleConsoleReducer";
import singleGameReducer from "./singleGameReducer";
import singleGenreReducer from "./singleGenreReducer";

const reducer = {
    genres: genresReducer,
    games: gamesReducer,
    consoles: consolesReducer,
    singleGame: singleGameReducer,
    singleGenre: singleGenreReducer,
    singleConsole: singleConsoleReducer
}

const store = configureStore({reducer})

export default store;