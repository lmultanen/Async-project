import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, NavLink, useNavigate, Link } from "react-router-dom"
import AccountPage from "./components/AccountPage";
import AllConsoles from "./components/AllConsoles";
import AllGames from "./components/AllGames";
import AllGenres from "./components/AllGenres";
import CreateAccountPage from "./components/CreateAccountPage";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SingleConsole from "./components/SingleConsole";
import SingleGame from "./components/SingleGame";
import SingleGenre from "./components/SingleGenre";
import Suggestor from "./components/Suggestor";
import { fetchAllUsernames } from "./store/allUsernamesReducer";
import { setTotalGameNumber } from "./store/totalGameNumReducer";
import { fetchUserByToken, logoutUser } from "./store/userReducer";

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(setTotalGameNumber(''));
    dispatch(fetchAllUsernames());
    attemptTokenLogin();
  },[])
  const user = useSelector(state => state.user);

  const attemptTokenLogin = async () => {
    const token = window.localStorage.getItem('token');
    if (token) {
      dispatch(fetchUserByToken(token));
    }
  }

  const logoutClickHandler = () => {
    dispatch(logoutUser())
    window.localStorage.setItem('token','')
    navigate('/')
  }

  return (
    <>
      <nav>
        <div className='menu-links'>
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
          {/* <NavLink 
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
          </NavLink> */}
          {/* hiding links to genres, consoles for now since not paginated/formatted well */}
          <NavLink 
            end to='/suggestion' 
            className='menu-link'
            style={({isActive}) => 
              ({color: isActive ? '#3c3c33' : 'white',
              textDecoration: isActive ? 'underline' : 'none'})}>
                New Suggestion
          </NavLink>
        </div>
        <div>
          {!user.id ?
            <SignIn attemptTokenLogin={attemptTokenLogin}/> 
            : <div>
                <div>{`Welcome back, `} <Link to='/accountdetails'>{user.username}</Link></div>
                <button onClick={logoutClickHandler}>Logout</button>
              </div>
          }
        </div>
      </nav>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/games' element={<AllGames/>}/>
        <Route path='/genres' element={<AllGenres/>}/>
        <Route path='/consoles' element={<AllConsoles/>}/>
        <Route path='/suggestion' element={<Suggestor/>}/>
        <Route path='/games/:slug' element={<SingleGame/>}/>
        <Route path='/genres/:slug' element={<SingleGenre/>}/>
        <Route path='/consoles/:slug' element={<SingleConsole/>}/>
        <Route path='/accountdetails' element={<AccountPage/>}/>
        <Route path='/createaccount' element={<CreateAccountPage/>}/>
      </Routes>
      <footer>
        <Footer/>
      </footer>
    </>
  );
}

export default App;


// will want to improve styling of list displays; instead of just names, have boxes with name, rating, icon; hover over to make larger, etc.

// probably should also build out pagination for genres, consoles too now
// --- might not even need to have consoles visible tab tbh; could just be a filtering method

// look to build out the basic "Suggestion" component; have a few questions that would filter down total number of games
// -- at the end, would look to sort games based on rating/metacritic rating by default
// -- maybe limit to 5 games to start; have ability to decline and show another 5, etc.

// look to add in some auth functionality next with firebase
// if no user signed in, show a "sign up/log in" link top right screen
// if user, display "welcome back, user"
// want to then have a dropdown that allows logging out, or seeing favorited games
// want ability to favorite games in SingleGame component

// can look into adding a filter toolbar functionality; filter by user_rating, metacritic, console, etc.

// if all this functionality in place, can look into moving all data into firebase database
// -- will likely need to refactor some stuff at that point

// if use firebase, could try to implement messaging system between two users