import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchConsoles } from "../store/consolesReducer";
import { fetchGenres } from "../store/genresReducer";
import { fetchSuggestedGames, unmountSuggestedGames } from "../store/suggestedGamesReducer";
import { addFavoriteGame, removeFavoriteGame } from "../store/userReducer";

const Suggestor = () => {
    // const games = useSelector(state => state.games)
    const consoles = useSelector(state => state.consoles)
    const genres = useSelector(state => state.genres)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [choices, setChoices] = useState({
        console: '<select system>',
        genre: '<select genre>'
    })
    const suggested = useSelector(state => state.suggestedGames)
    const [fetched, setFetched] = useState(false)

    React.useEffect(() => {
        // dispatch(setTotalGameNumber())
        // dispatch(fetchGames())
        if (!genres.length){
            dispatch(fetchGenres())
        }
        if (!consoles.length) {
            dispatch(fetchConsoles())
        }
        return () => {
            dispatch(unmountSuggestedGames())
        }
    },[])

    const checkDisabled = () => {
        return (choices.console === '<select system>') || (choices.genre === '<select genre>')
    }

    const fetchSuggested = () => {
        dispatch(fetchSuggestedGames(choices.console, choices.genre))
        setFetched(true);
    }

    const filterSuggested = () => {
        let copy = [...suggested].filter(game => game.user_rating >= 4 || game.metacritic_rating >= 80);
        if (copy.length <= 5) {
            return copy;
        } else {
            let chosen = [];
            while (chosen.length < 5) {
                let index = Math.floor(Math.random()*copy.length)
                if (!chosen.includes(copy[index])) {
                    chosen.push(copy[index])
                }
            }
            return chosen;
        }
    }
    const favoriteClickHandler = (game) => {
        dispatch(addFavoriteGame(user,game))
    }
    const unfavoriteClickHandler = (game) => {
        dispatch(removeFavoriteGame(user,game))
    }


    return( genres.length ?
    <div>
        <h2>Welcome to our Suggestion Tab!</h2>
        <h3>Answer the following questions to find your next game!</h3>
        <label htmlFor='console'>Select Preferred System: </label>
        <select defaultValue='<select system>' id='system-selector' onChange={(event) => {setChoices({...choices, console: event.target.value}); dispatch(unmountSuggestedGames()); setFetched(false)}}>
            <option>{'<select system>'}</option>
            {consoles.length ? consoles.map((console,idx) => console.games.length ? <option key={idx}>{console.name}</option> : <option key={idx} hidden></option>) : <></>}
        </select>
        <label htmlFor="genre">Select Preferred Genre:</label>
        <select defaultValue='<select genre>' id='genre-selector' onChange={(event) => {setChoices({...choices, genre: event.target.value}); dispatch(unmountSuggestedGames()); setFetched(false)}}>
            <option>{'<select genre>'}</option>    
            {genres.length ? genres.map((genre,idx) => <option key={idx}>{genre.name}</option>) : <></>}
        </select>

        <button type='submit' disabled={checkDisabled()} onClick={fetchSuggested}>Discover Suggestions!</button>
        {fetched ?
            (filterSuggested().length ?
            <ul>
                {filterSuggested().map((game,idx) => <li className="suggestion" key={idx}><Link to={`/games/${game.slug}`}>{game.name}</Link>
                                                                                                {/* <span>{user.id ? (!user.games.map(game => game.name).includes(game.name) ?
                                                                                                    <div className='favorite-link' onClick={() => favoriteClickHandler(game)}>Add to Favorites</div> 
                                                                                                    : <div className='favorite-link' onClick={() => unfavoriteClickHandler(game)}>Remove from Favorites</div>) : ''}</span> */}
                                                                                                    <div className="game-suggestion-details">{`ESRB: ${game.esrb_rating}, ` + (game.user_rating/5 < game.metacritic_rating/100 ? `Approval score: ${game.metacritic_rating}%` : `Approval score: ${Math.round(game.user_rating*20)}%`)}</div>
                                                                                                    </li>)}
            </ul> : <div>Sorry, no games match chosen criteria</div>)
            : <></>
        }
    </div> : <div>Loading...</div>
    )
}

export default Suggestor;

// maybe want to have a couple questions; question number could be a query result in url maybe?
// 1) what system(s) do you want to play on?
// 2) what genre are you looking for?
// --- maybe could go back and look to add some tags?
// --- at very least, maybe single-player and multi-player
// --- firstperson/thirdperson, etc.
// --- might be worth having at least a few tags; could help narrow down

// maybe could just default only pick games with over 4.0 user_rating or over 80 metacritic;
// -- then, randomly display games