import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGenres } from "../store/genresReducer";

const AllGenres = () => {
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);

    React.useEffect(() => {
        dispatch(fetchGenres());
    },[])

    return(genres.length ?
        <div id='all-genres'>
            <h3>All Genres</h3>
            <ul id='genre-list'>
                {genres.map((genre,idx) => {
                    return(
                        <Link to={`/genres/${genre.slug}`} key={idx}>
                            <li>
                                {genre.name + ` (${genre.games.length})`}
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </div>
        : <div>Loading...</div>
    )
}

export default AllGenres;