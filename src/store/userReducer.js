import axios from "axios";

const SET_USER = 'SET_USER';
// const CREATE_USER = 'CREATE_USER'

const _setUser = (user) => ({
    type: SET_USER,
    user
})

export const fetchUserByToken = (token) => {
    return async (dispatch) => {
        const {data: user} = await axios.get('/api/auth', {
            headers: {
              authorization: token
            }
        });
        dispatch(_setUser(user))
    }
}
export const logoutUser = () => {
    return (dispatch) => {
        dispatch(_setUser({}))
    }
}
export const createUser = (username, password) => {
    return async (dispatch) => {
        const {data: user} = await axios.post('/api/users', {username, password})
        dispatch(_setUser(user))
    }
}
export const addFavoriteGame = (user, game) => {
    return async (dispatch) => {
        const {data: updated} = await axios.put(`/api/users/${user.id}`, {game, method: 'add'})
        dispatch(_setUser(updated))
    }
}
export const removeFavoriteGame = (user, game) => {
    return async (dispatch) => {
        const {data: updated} = await axios.put(`/api/users/${user.id}`, {game, method: 'remove'})
        dispatch(_setUser(updated))
    }
}

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
}

export default userReducer;