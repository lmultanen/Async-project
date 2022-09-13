import React from "react";

const Home = () => {
    return(
    <div>
        <h1>Welcome to Game Suggest</h1>
        <p>Game Suggest has a database of several thousand games released within the past couple of years across multiple genres and consoles.</p>
        <p>Users can view all games in the 'Games' tab, games by genre in the 'Genre' tab, and games by console in the 'Console' tab</p>
        <p>If you have an itch to play a new game, but are paralyzed by choice, check out the 'New Suggestion' tab. There, you can set some parameters, and our proprietary algorithm* will suggest up to five games to play!</p>
        <p>Users that have an account with us are able to save games to their own favorites list, useful for when you might find several games you want to check out at a later time!</p>
        <p>{'\n'}</p>
        <p>{'\n\n\n *algorithm only suggests games that are well-rated'}</p>
    </div>
    )
}

// basic home page info, not styled particularly well.

export default Home;