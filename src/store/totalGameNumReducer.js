import axios from "axios";

const SET_TOTAL_GAME_NUMBER = 'SET_TOTAL_GAME_NUMBER';

const _setTotalGameNumber = (number) => ({
    type: SET_TOTAL_GAME_NUMBER,
    number
})

export const setTotalGameNumber = () => {
    return async (dispatch) => {
        const {data: games} = await axios.get('/api/games');
        dispatch(_setTotalGameNumber(games.length))
    }
}

const totalGameNumReducer = (state = 0, action) => {
    switch (action.type) {
        case SET_TOTAL_GAME_NUMBER:
            return action.number;
        default:
            return state;
    }
}

export default totalGameNumReducer;