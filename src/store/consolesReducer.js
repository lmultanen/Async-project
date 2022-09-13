import axios from "axios";

const SET_CONSOLES = "SET_CONSOLES"

const _setGames = (consoles) => ({
    type: SET_CONSOLES,
    consoles
})

//thunks
export const fetchConsoles = () => {
    return async (dispatch) => {
        const {data: consoles} = await axios.get('/api/consoles')
        dispatch(_setGames(consoles))
    }
}

const consolesReducer = (state = [], action) => {
    switch (action.type) {
        case SET_CONSOLES:
            return action.consoles;
        default:
            return state
    }
}

export default consolesReducer;