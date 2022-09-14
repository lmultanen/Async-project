import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = ({attemptTokenLogin}) => {
    const [state, setState] = useState({
        username: '',
        password: ''
    })

    const handleChange = props => event => {
        setState({
            ...state,
            [props]: event.target.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const {data: token} = await axios.post('/api/auth', {username: state.username, password: state.password})
        window.localStorage.setItem('token', token)
        attemptTokenLogin();
    }

    return(
        <form id='sign-in-form' onSubmit={handleSubmit}>
            <div className="log-in-line">
                <label htmlFor="username">Username:</label>
                <input className='log-in-input' name='username' value={state.username} onChange={handleChange('username')}/>
            </div>
            <div className="log-in-line">
                <label htmlFor="password">Password:</label>
                <input className='log-in-input' name='password' type='password' value={state.password} onChange={handleChange('password')}/>
            </div>
            <div className="log-in-line">
                {/* should make this a Link later */}
                <Link id='create-account' to='/createaccount'>Create Account?</Link>
                <button>Sign In</button>   
            </div>
        </form>
    )
}

export default SignIn;