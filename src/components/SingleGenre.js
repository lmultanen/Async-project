import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleGenre, unmountSingleGenre } from "../store/singleGenreReducer";

const SingleGenre = () => {
    const dispatch = useDispatch();
    const genre = useSelector(state => state.singleGenre)
    const params = useParams();

    React.useEffect(() => {
        dispatch(fetchSingleGenre(params.slug));
        return () => {
            dispatch(unmountSingleGenre());
        }
    },[])

    return (genre.name ?
        <div id='single-genre-display'>
            <h2>{`${genre.name} Games:`}</h2>
            <ul>
                {genre.games.map((game,idx) => {
                    return(
                        <Link to={`/games/${game.slug}`} key={idx}><li>{game.name}</li></Link>
                    )
                })}
            </ul>
        </div>
        : <div>Loading...</div>
    )
}

export default SingleGenre;