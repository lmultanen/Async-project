const port = process.env.PORT || 3000;
const app = require('./app');
const db = require('./db');

const init = () => {
    // await db.syncAndSeed();
    // will need to make init async if uncommenting out above line
    app.listen(port, ()=>console.log(`listening on port ${port}`));
}

init();