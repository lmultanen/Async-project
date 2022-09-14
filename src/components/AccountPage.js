import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AccountPage = () => {
    const user = useSelector(state => state.user)

    // could have a different component to view other users
    // on this page, would want to be able to edit information
    return( user.username ?
        <div>
            <h2>Profile Information</h2>
            <div>{`Username: ${user.username}`}</div>
            <div>Profile picture:</div>
            {/* could edit image later; would need to add url link to User model though */}
            <h4>Favorited Games:</h4>
            {user.games.length ?
                <ul>
                    {user.games.map((game,idx) => 
                        <li key={idx}><Link to={`/games/${game.slug}`}>{game.name}</Link></li>
                    )}
                    {/* Could try to add remove from favorites functionality directly from here, but would only save a couple clicks tbh */}
                </ul>
                : <div>No favorited games to display</div>
            }
            <h4>Comment history:</h4>
            <div>(placeholder for list of user comments)</div>
        </div>
        : <div>Log in to view account details</div>
    )
}

export default AccountPage;