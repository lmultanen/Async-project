import { configureStore } from "@reduxjs/toolkit";
import consolesReducer from "./consolesReducer";
import gamesReducer from "./gamesReducer";
import genresReducer from "./genresReducer";
import singleConsoleReducer from "./singleConsoleReducer";
import singleGameReducer from "./singleGameReducer";
import singleGenreReducer from "./singleGenreReducer";
import suggestedGamesReducer from "./suggestedGamesReducer";
import totalGameNumReducer from "./totalGameNumReducer";

const reducer = {
    genres: genresReducer,
    games: gamesReducer,
    consoles: consolesReducer,
    singleGame: singleGameReducer,
    singleGenre: singleGenreReducer,
    singleConsole: singleConsoleReducer,
    totalGameNum: totalGameNumReducer,
    suggestedGames: suggestedGamesReducer
}

const store = configureStore({reducer, middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableStateInvariant: false,
    }),})

export default store;