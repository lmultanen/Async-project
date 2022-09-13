import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, unmountGames } from "../store/gamesReducer";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { setTotalGameNumber } from "../store/totalGameNumReducer";

const AllGames = () => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const games = useSelector(state => state.games);
    const [page, setPage]  = useState(searchParams.get('page'))
    const totalGameNum = useSelector(state => state.totalGameNum)
    const [search, setSearch] = useState('')
    const [loaded, setLoaded] = useState(false)

    React.useEffect(() => {
        dispatch(fetchGames(page, search));
        dispatch(setTotalGameNumber(search));
        setLoaded(true)
        return () => {
            // if implement a search function, may want to re-fetch all games upon dismount
            dispatch(unmountGames())
            // dispatch(setTotalGameNumber(''))
        }
    },[page])

    const searchChangeHandler = (event) => {
        event.preventDefault();
        setSearch(event.target.value)
        setPage(1)
        dispatch(fetchGames(1,event.target.value));
        dispatch(setTotalGameNumber(event.target.value))
    }

    return( <div>
        <h3>{`All Games (${totalGameNum})`}</h3>
        {/* {Number(page) === 1 ?
            <div>
                <label htmlFor='search'>Search:</label>
                <input name='search' value={search} onChange={searchChangeHandler}/>
            </div>
            : <></>
        } */}
        <div>
                <label htmlFor='search'>Search:</label>
                <input name='search' value={search} onChange={searchChangeHandler}/>
            </div>
        
        {games.length ?
        <div id='all-games'>
            {/* using hardcoded 20 results per page */}
            <ol start={page ? (page-1)*20 + 1 : 1}>
                {games.map((game,idx) => {
                    return(
                        <li key={idx}>
                            <Link to={`/games/${game.slug}`}>
                                {game.name}
                            </Link>
                        </li>
                    )
                })}
            </ol>
            <div className="prev-next">
                {/* basic logic for now, will want to replace with disabling links instead */}
                <Link to={`/games?page=${Number(page)-1}`} className={Number(page) === 1 ? 'disabled' : ''} onClick={() => setPage(+page-1)}>Prev</Link>
                <Link to={`/games?page=${Number(page)+1}`} className={page*20 >= totalGameNum ? 'disabled' : ''} onClick={() => setPage(+page+1)}>Next</Link>
            </div>
        </div>
        : 
        // <div>Loading...</div>
        !totalGameNum && loaded ? <div>No games to display</div> : <div>Loading...</div>
        }
        </div>
    )
}

//try to add pagination; will look into sorting alphabetically by default, maybe can look into other sorts later

export default AllGames;