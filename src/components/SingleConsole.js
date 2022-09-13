import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleConsole, unmountSingleConsole } from "../store/singleConsoleReducer";

const SingleConsole = () => {
    const dispatch = useDispatch();
    const console = useSelector(state => state.singleConsole);
    const params = useParams();

    React.useEffect(() => {
        dispatch(fetchSingleConsole(params.slug))
        return () => {
            dispatch(unmountSingleConsole())
        }
    },[])

    return (console.name ?
        <div id='single-console-display'>
            <h2>{console.name}</h2>
            <img src={console.imageUrl} height='200px' width='200px' alt='Console'/>
            {console.games.length ? 
                <div>
                    <h3>Games List</h3>
                    <ul>
                        {console.games.map((game,idx) => <Link to={`/games/${game.slug}`} key={idx}><li>{game.name}</li></Link>)}
                    </ul>
                </div>
                : <></>
            }
        </div>
        : <div>Loading...</div>
    )
}

export default SingleConsole;