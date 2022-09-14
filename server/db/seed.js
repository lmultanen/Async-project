const db = require('./db');
const axios = require('axios');
const Game = require('./game');
const Genre = require('./genre');
const Console = require('./console')
const User = require('./user')

Genre.hasMany(Game);
Genre.belongsToMany(Game, {through: 'game_genre'});
Game.belongsToMany(Genre, { through: 'game_genre'});
Console.hasMany(Game);
Console.belongsToMany(Game, { through: 'game_console'});
Game.belongsToMany(Console, { through: 'game_console'});

User.hasMany(Game)
User.belongsToMany(Game, {through: 'game_user'})
Game.belongsToMany(User, {through: 'game_user', as: 'favoritedGame'})

const syncAndSeed = async () => {
    await db.sync({force: true});

    let games = await pullGames();
    console.log('games fetched');
    let genres = await pullGenres();
    console.log('genres fetched');
    let consoles = await pullConsoles();
    console.log('consoles fetched');

    await Promise.all(genres.map(genre => {
        return Genre.create({
            name: genre.name,
            slug: genre.slug,
            imageUrl: genre.image_background
        })
    }))

    await Promise.all(consoles.map(console => {
        return Console.create({
            name: console.name,
            slug: console.slug,
            imageUrl: console.image_background
        })
    }))

    await Promise.all(games.map(async game => {
        let newGame = await Game.create({
            name: game.name,
            slug: game.slug,
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
        })
        if (game.platforms) {
            game.platforms.forEach(async platform => {
                let consoleModel = await Console.findOne({
                    where: {
                        name: platform.platform.name
                    }
                })
                await newGame.addConsole(consoleModel)
            })
        }
    }))
    seedUsers();
    console.log('db synced!')
}

const pullGames = async () => {
    // hardcoding date range for now; would be cool to allow user to customize date range or have it as a preference later
    let games = [];
    let page = 1;
    // hard coding to just 3 months for now; taking too long to fetch everything up to 2 years; ideally only want to fetch once and then generate db
    // maybe can increase page size; seems to be capped at 40...
    let response = await axios.get(`https://api.rawg.io/api/games?dates=2020-01-01,2022-09-09&key=8704d1b9804f464ba902927608a7892e&page=${page}&page_size=40`)
    if (response) {
        games = [...games, ...response.data.results];
        // limiting number pulled here currently
        while (page < 100) {
            page++;
            console.log('fetching page ',page)
            response = await axios.get(`https://api.rawg.io/api/games?dates=2020-01-01,2022-09-09&key=8704d1b9804f464ba902927608a7892e&page=${page}&page_size=40`)
            games = [...games, ...response.data.results];
        }
    }
    console.log('total number of games: ', games.length)
    return games;
}

// so far only seems to be 19 genres; will see if that still holds when pulling more data
const pullGenres = async () => {
    let response = await axios.get('https://api.rawg.io/api/genres?key=8704d1b9804f464ba902927608a7892e');
    return response.data.results;
}

const pullConsoles = async () => {
    let consoles = [];
    let page = 1;
    let response = await axios.get(`https://api.rawg.io/api/platforms?key=8704d1b9804f464ba902927608a7892e&page=${page}`)
    consoles = [...consoles, ...response.data.results]
    while (response.data.next) {
        page++;
        response = await axios.get(`https://api.rawg.io/api/platforms?key=8704d1b9804f464ba902927608a7892e&page=${page}`)
        consoles = [...consoles, ...response.data.results]
    }
    return consoles;
}

const seedUsers = async () => {
    await db.sync();
    const credentials = [
        {username: 'luke', password: 'luke_pw'},
        {username: 'lisa', password: 'lisa_pw'}
    ]
    const [luke, lisa] = await Promise.all(
        credentials.map( credential => User.create(credential))
    )
}

syncAndSeed();