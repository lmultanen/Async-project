import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, NavLink } from "react-router-dom"
import AllConsoles from "./components/AllConsoles";
import AllGames from "./components/AllGames";
import AllGenres from "./components/AllGenres";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SingleConsole from "./components/SingleConsole";
import SingleGame from "./components/SingleGame";
import SingleGenre from "./components/SingleGenre";
import { setTotalGameNumber } from "./store/totalGameNumReducer";

function App() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(setTotalGameNumber(''));
  },[])

  return (
    <>
      <nav>
        {/* should later wrap div here, another div on right side for log in/user menu*/}
        {/* could probably make this it's own component tbh*/}
        <NavLink 
          to='/' 
          className='menu-link'
          style={({isActive}) => 
            ({color: isActive ? '#3c3c33' : 'white',
            textDecoration: isActive ? 'underline' : 'none'})}>
              Home
        </NavLink>
        <NavLink 
          end to='/games?page=1' 
          className='menu-link'
          style={({isActive}) => 
            ({color: isActive ? '#3c3c33' : 'white',
            textDecoration: isActive ? 'underline' : 'none'})}>
              Games
        </NavLink>
        <NavLink 
          end to='/genres' 
          className='menu-link'
          style={({isActive}) => 
            ({color: isActive ? '#3c3c33' : 'white',
              textDecoration: isActive ? 'underline' : 'none'})}>
              Genres
        </NavLink>
        <NavLink 
          end to='/consoles' 
          className='menu-link'
          style={({isActive}) => 
            ({color: isActive ? '#3c3c33' : 'white',
            textDecoration: isActive ? 'underline' : 'none'})}>
              Consoles
        </NavLink>
      </nav>
      <Routes>
        <Route index element={<Home/>}/>
        {/* <Route path={'/games?page=1'} element={<AllGames/>}/> */}
        <Route path='/games' element={<AllGames/>}/>
        {/* <Route path='/games' <Redirect */}
        <Route path='/genres' element={<AllGenres/>}/>
        <Route path='/consoles' element={<AllConsoles/>}/>
        <Route path='/games/:slug' element={<SingleGame/>}/>
        <Route path='/genres/:slug' element={<SingleGenre/>}/>
        <Route path='/consoles/:slug' element={<SingleConsole/>}/>
      </Routes>
      <footer>
        <Footer/>
      </footer>
    </>
  );
}

export default App;


// will want to improve styling of list displays; instead of just names, have boxes with name, rating, icon; hover over to make larger, etc.

// look to build out the basic "Suggestion" component; have a few questions that would filter down total number of games
// -- at the end, would look to sort games based on rating/metacritic rating by default
// -- maybe limit to 5 games to start; have ability to decline and show another 5, etc.

// other potential functionality: search feature;
// -- would likely need to pass in an object as second param into axios.get
// -- could then find all games that contain search string or something

// look to add in some auth functionality next with firebase
// if no user signed in, show a "sign up/log in" link top right screen
// if user, display "welcome back, user"
// want to then have a dropdown that allows logging out, or seeing favorited games
// want ability to favorite games in SingleGame component

// if all this functionality in place, can look into moving all data into firebase database
// -- will likely need to refactor some stuff at that point