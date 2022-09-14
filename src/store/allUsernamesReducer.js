import axios from "axios";

const SET_ALL_USERNAMES = 'SET_ALL_USERNAMES';

const _setAllUsernames = (usernames) => ({
    type: SET_ALL_USERNAMES,
    usernames
})

export const fetchAllUsernames = () => {
    return async (dispatch) => {
        // axios call here
        const {data: usernames} = await axios.get('/api/users')
        dispatch(_setAllUsernames(usernames))
    }
}

const allUsernamesReducer = (state = [], action) => {
    switch (action.type) {
        case SET_ALL_USERNAMES:
            return action.usernames;
        default:
            return state;
    }
}

export default allUsernamesReducer;