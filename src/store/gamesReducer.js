import axios from "axios";

const SET_GAMES = "SET_GAMES"

const _setGames = (games) => ({
    type: SET_GAMES,
    games
})

//thunks
export const fetchGames = () => {
    return async (dipatch) => {
        const {data: games} = await axios.get('/api/games')
        dipatch(_setGames(games))
    }
}

const gamesReducer = (state = [], action) => {
    switch (action.type) {
        case SET_GAMES:
            return action.games;
        default:
            return state
    }
}

export default gamesReducer;