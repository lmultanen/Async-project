const db = require('./db');
const axios = require('axios');
const Game = require('./game');
const Genre = require('./genre');

Genre.hasMany(Game)
Genre.belongsToMany(Game, {through: 'game_genre'});
Game.belongsToMany(Genre, { through: 'game_genre'});

const syncAndSeed = async () => {
    await db.sync({force: true});

    let games = await pullGames();
    console.log('games fetched');
    let genres = await pullGenres();
    console.log('genres fetched');

    await Promise.all(genres.map(genre => {
        return Genre.create({
            name: genre.name,
            slug: genre.slug,
            imageUrl: genre.image_background
        })
    }))

    await Promise.all(games.map(async game => {
        let platforms = [];
        game.platforms.forEach(platform => platforms.push(platform.platform.name))
        let newGame = await Game.create({
            name: game.name,
            slug: game.slug,
            platforms: platforms,
            releaseDate: game.released,
            urlImage: game.background_image,
            user_rating: game.rating,
            metacritic_rating: game.metacritic,
            esrb_rating: game.esrb_rating ? game.esrb_rating.name : 'Rating Pending'
        })
        game.genres.forEach(async genre => {
            let genreModel = await Genre.findAll({
                where: {
                    name: genre.name
                }
            })
            await newGame.addGenre(genreModel)
            // await genreModel.addGame(newGame);
        })
    }))
    console.log('db synced!')
}


const pullGames = async () => {
    // hardcoding date range for now; would be cool to allow user to customize date range or have it as a preference later
    // if able to move to firebase later, maybe don't need to have a date range at all? could just be able to use everything
    let games = [];
    let page = 1;
    // hard coding to just 3 months for now; taking too long to fetch everything up to 2 years; ideally only want to fetch once and then generate db
    // maybe can increase page size; seems to be capped at 40...
    let response = await axios.get(`https://api.rawg.io/api/games?dates=2020-01-01,2022-09-09&key=8704d1b9804f464ba902927608a7892e&page=${page}&page_size=40`)
    if (response) {
        games = [...games, ...response.data.results];
        // limiting number pulled here currently
        while (page < 1) {
            page++;
            console.log('fetching page ',page)
            response = await axios.get(`https://api.rawg.io/api/games?dates=2020-01-01,2022-09-09&key=8704d1b9804f464ba902927608a7892e&page=${page}&page_size=40`)
            games = [...games, ...response.data.results];
            // console.log("total number of games: ", games.length)
        }
    }
    console.log('total number of games: ', games.length)
    // games.forEach(element => console.log(`Name: ${element.name} Rating: ${element.rating}`))
    // console.log(games[0])
    // console.log(games[0].platforms)
    return games;
}

const pullGenres = async () => {
    // let genres = [];
    // let page = 1;
    let response = await axios.get('https://api.rawg.io/api/genres?key=8704d1b9804f464ba902927608a7892e');
    // console.log(response.data.results)
    // console.log(response.data)
    return response.data.results;
}

// syncAndSeed()
// pullGenres()

module.exports = {
    db,
    syncAndSeed,
    Game,
    Genre
}

// hopefully can move all of this to firebase later to avoid having to repull each time and have a faster launch

// next steps: build models for Genre, Game
// generate models based on pulled results and seed the database
// -- built out models and made associations in sync/seed method;
// -- should look to build out routes now, ideally don't need to re-sync/seed each time going forward

// build out some api routes and stuff to see this information
// build out some basic components to view all genres, all games
// build out components to view single games, single genres (would essentially filter games down)
// after that, can build out a 'suggest' component/tab
// --- will need to figure out how to build list of all platforms to choose from
// --- either need to make a platform model (might be trickier), or just build an array of platforms when everything first sync'd
// --- or, make a function that iterates through all games in database and finds all platorms?
// --- would have a series of questions, filter down all games, and then display games from there
// then, can look into adding in users/auth functionality with firebase
// users should have the ability to load their favorites list and be able to comment on specific games
