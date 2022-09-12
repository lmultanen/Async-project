import axios from "axios";

const SET_SINGLE_GENRE = 'SET_SINGLE_GENRE';

const _setSingleGenre = (genre) => ({
    type: SET_SINGLE_GENRE,
    genre
})

export const fetchSingleGenre = (slug) => {
    return async (dispatch) => {
        try {
            const {data: genre} = await axios.get(`/api/genres/${slug}`);
            dispatch(_setSingleGenre(genre))
        } catch (err) {
            //error handling here later
        }
    }
}
export const unmountSingleGenre = () => {
    return (dispatch) => {
        dispatch(_setSingleGenre({}))
    }
}

const singleGenreReducer = (state={}, action) => {
    switch (action.type) {
        case SET_SINGLE_GENRE:
            return action.genre;
        default:
            return state;
    }
}

export default singleGenreReducer;