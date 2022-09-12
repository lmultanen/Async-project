import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchGames } from "./store/gamesReducer"
// import { fetchGenres } from "./store/genresReducer"
import { Routes, Route, NavLink } from "react-router-dom"
import AllGames from "./components/AllGames";
import AllGenres from "./components/AllGenres";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SingleGame from "./components/SingleGame";
import SingleGenre from "./components/SingleGenre";

function App() {
  // const dispatch = useDispatch();
  // const games = useSelector(state => state.games);
  // const genres = useSelector(state => state.genres);

  // React.useEffect(() => {
  //   dispatch(fetchGames());
  //   dispatch(fetchGenres());
  // },[])

  // add in a navigation link to home, games, genres, and in the future the suggestion tab
  return (
    <>
      {/* <h1>Welcome to Game Suggest</h1> */}
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink end to='/games'>Games</NavLink>
        <NavLink end to='/genres'>Genres</NavLink>
      </nav>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/games' element={<AllGames/>}/>
        <Route path='/genres' element={<AllGenres/>}/>
        <Route path='/games/:slug' element={<SingleGame/>}/>
        <Route path='/genres/:slug' element={<SingleGenre/>}/>
      </Routes>
      <footer>
        <Footer/>
      </footer>
    </>
  );
}

export default App;


// will want to improve styling of list displays; instead of just names, have boxes with name, rating, icon; hover over to make larger, etc.