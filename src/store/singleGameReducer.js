import axios from "axios";

const SET_SINGLE_GAME = 'SET_SINGLE_GAME'

const _setSingleGame = (game) => ({
    type: SET_SINGLE_GAME,
    game
})

//thunks
export const fetchSingleGame = (slug) => {
    return async (dispatch) => {
        try {
            const {data: game} = await axios.get(`/api/games/${slug}`);
            dispatch(_setSingleGame(game))
        } catch (err) {
            //error handling here for incorrect game url paths; write an error reducer
        }
    }
}
export const unmountSingleGame = () => {
    return (dispatch) => {
        dispatch(_setSingleGame({}))
    }
}

const singleGameReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_SINGLE_GAME:
            return action.game;
        default:
            return state;
    }
}

export default singleGameReducer