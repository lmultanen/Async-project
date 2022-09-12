import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../store/gamesReducer";
import { Link } from "react-router-dom";

const AllGames = () => {
    const dispatch = useDispatch()
    const games = useSelector(state => state.games);

    React.useEffect(() => {
        dispatch(fetchGames());
    },[])

    return( games.length ?
        <div id='all-games'>
            <h3>All Games</h3>
            <ol>
                {games.map((game,idx) => {
                    return(
                        <Link to={`/games/${game.slug}`} key={idx}>
                        <li>{game.name}</li>
                        </Link>
                    )
                })}
            </ol>
        </div>
        : <div>Loading...</div>
    )
}

//try to add pagination; will look into sorting alphabetically by default, maybe can look into other sorts later

export default AllGames;