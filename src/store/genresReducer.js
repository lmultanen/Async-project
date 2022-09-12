import axios from "axios";

const SET_GENRES = "SET_GENRES"

const _setGenres = (genres) => ({
    type: SET_GENRES,
    genres
})

//thunks
export const fetchGenres = () => {
    return async (dipatch) => {
        const {data: genres} = await axios.get('/api/genres')
        dipatch(_setGenres(genres))
    }
}

const genresReducer = (state = [], action) => {
    switch (action.type) {
        case SET_GENRES:
            return action.genres;
        default:
            return state
    }
}

export default genresReducer;