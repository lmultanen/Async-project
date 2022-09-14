import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllUsernames } from "../store/allUsernamesReducer";
import { createUser, fetchUserByToken } from "../store/userReducer";

const CreateAccountPage = () => {
    const usernames = useSelector(state => state.allUsernames)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(createUser(form.username, form.password));
        const token = await user.authenticate({username: form.username, password: form.password});
        window.localStorage.setItem('token',token)
        dispatch(fetchUserByToken(token));
        dispatch(fetchAllUsernames());
        navigate('/accountdetails')
    }

    //need on change handler, on submit handler
    const handleChange = props => event => {
        setForm({
            ...form,
            [props]: event.target.value
        })
    }

    const checkDisabled = () => {
        return (!form.username.length || !form.password.length || usernames.includes(form.username.toLowerCase()))
    }

    return( !user.id ?
        <form id='new-account-form' onSubmit={handleSubmit}>
            <label htmlFor="username">Username <span id='taken'>{usernames.includes(form.username) ? 'username taken' : ''}</span></label>
            <input type='text' value={form.username} onChange={handleChange('username')}/>
            <label htmlFor="password">Password</label>
            <input type='password' value={form.password} onChange={handleChange('password')}/>
            <button type='submit' disabled={checkDisabled()}>Create Account</button>
        </form>
        : <div>Cannot create account when already logged in</div>
    )
}

export default CreateAccountPage;