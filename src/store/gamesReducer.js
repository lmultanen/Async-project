import axios from "axios";

const SET_GAMES = "SET_GAMES"
const UNMOUNT_GAMES = 'UNMOUNT_GAMES'

const _setGames = (games) => ({
    type: SET_GAMES,
    games
})

//thunks
export const fetchGames = (page) => {
    return async (dispatch) => {
        // should probably default to page=1 tho; also, later can input search params into the get request
        const address = page ? `/api/games?page=${page}` : '/api/games'
        const {data: games} = await axios.get(address)
        dispatch(_setGames(games))
    }
}
export const unmountGames = () => {
    return (dispatch) => {
        dispatch(_setGames([]));
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