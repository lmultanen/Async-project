import axios from "axios";

const SET_SINGLE_CONSOLE = 'SET_SINGLE_CONSOLE'

const _setSingleConsole = (console) => ({
    type: SET_SINGLE_CONSOLE,
    console
})

//thunks
export const fetchSingleConsole = (slug) => {
    return async (dispatch) => {
        try {
            const {data: console} = await axios.get(`/api/consoles/${slug}`);
            dispatch(_setSingleConsole(console))
        } catch (err) {
            //error handling here for incorrect game url paths; write an error reducer
        }
    }
}
export const unmountSingleConsole = () => {
    return (dispatch) => {
        dispatch(_setSingleConsole({}))
    }
}

const singleConsoleReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_SINGLE_CONSOLE:
            return action.console;
        default:
            return state;
    }
}

export default singleConsoleReducer