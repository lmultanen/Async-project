import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleGame, unmountSingleGame } from "../store/singleGameReducer";

const SingleGame = () => {
    const dispatch = useDispatch();
    const game = useSelector(state => state.singleGame)
    const params = useParams();

    React.useEffect(() => {
        dispatch(fetchSingleGame(params.slug))
        return () => {
            dispatch(unmountSingleGame())
        }
    },[]);

    return (game.name ?
       <div id='single-game-display'>
            <h2>{game.name}</h2>
            <img src={game.urlImage} height='200px' width='200px' alt="Game box art"/>
            <div>{`Released: ${game.releaseDate.slice(0,10)}`}</div>
            <div><span>{'Genres: '}</span>{game.genres.map(((genre,idx) => <Link to={`/genres/${genre.slug}`} key={idx}>{genre.name + (idx < game.genres.length -1 ? ', ' : '')}</Link>))}</div>
            <div>{`ESRB Rating: ${game.esrb_rating}`}</div>
            <div>{`User Rating: ${game.user_rating ? game.user_rating : 'N/A'}`}</div>
            <div>{`Metacritic score: ${game.metacritic_rating ? game.metacritic_rating : 'N/A'}`}</div>
            <div><span>{'Platorms: '}</span>{game.consoles.map((console,idx) => <Link to={`/consoles/${console.slug}`} key={idx}><span>{console.name + (idx < game.consoles.length -1 ? ', ' : '')}</span></Link>)}</div>
       </div> 
       : <div>Loading...</div>
    )
}

export default SingleGame;