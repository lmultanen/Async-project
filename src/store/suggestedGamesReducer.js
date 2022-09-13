import axios from "axios";

const SET_SUGGESTED_GAMES = "SET_SUGGESTED_GAMES"

const _setSuggestedGames = (games) => ({
    type: SET_SUGGESTED_GAMES,
    games
})

export const fetchSuggestedGames = (console, genre) => {
    return async (dispatch) => {
        const {data: games} = await axios.get('/api/games', {params: {console, genre}})
        dispatch(_setSuggestedGames(games))
    }
}
export const unmountSuggestedGames = () => {
    return (dispatch) => {
        dispatch(_setSuggestedGames([]))
    }
}

const suggestedGamesReducer = (state = [], action) => {
    switch(action.type) {
        case SET_SUGGESTED_GAMES:
            return action.games;
        default:
            return state;
    }
}

export default suggestedGamesReducer;