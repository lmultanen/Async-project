import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, unmountGames } from "../store/gamesReducer";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";

const AllGames = () => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const games = useSelector(state => state.games);
    const [page, setPage]  = useState(searchParams.get('page'))
    const totalGameNum = useSelector(state => state.totalGameNum)

    React.useEffect(() => {
        dispatch(fetchGames(page));
        return () => {
            // if implement a search function, may want to re-fetch all games upon dismount
            dispatch(unmountGames())
        }
    },[page])

    return( games.length ?
        <div id='all-games'>
            <h3>All Games</h3>
            {/* using hardcoded 20 results per page */}
            <ol start={page ? (page-1)*20 + 1 : 1}>
                {games.map((game,idx) => {
                    return(
                        <Link to={`/games/${game.slug}`} key={idx}>
                        <li>{game.name}</li>
                        </Link>
                    )
                })}
            </ol>
            <div className="prev-next">
                {/* basic logic for now, will want to replace with disabling links instead */}
                <Link to={`/games?page=${Number(page)-1}`} className={Number(page) === 1 ? 'disabled' : ''} onClick={() => setPage(+page-1)}>Prev</Link>
                <Link to={`/games?page=${Number(page)+1}`} className={page*20 >= totalGameNum ? 'disabled' : ''} onClick={() => setPage(+page+1)}>Next</Link>
            </div>
        </div>
        : <div>Loading...</div>
    )
}

//try to add pagination; will look into sorting alphabetically by default, maybe can look into other sorts later

export default AllGames;