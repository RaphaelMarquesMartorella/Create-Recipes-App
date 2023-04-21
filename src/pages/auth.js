import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='auth'>
        <Login />
        <Register />
    </div>
  )
}

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')

    const [_, setCookies] = useCookies(['access_token'])

    const navigate = useNavigate()

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                username:username,
                password:password,
        });
        if(!response.data._id) setAlert('*Fill in the fields correctly*')
        if(response.data.token){
        setCookies('access_token', response.data.token);
        window.localStorage.setItem('userID', response.data.userID);
        navigate("/")
        }else {
            console.log('Provide a valid user and password!');
        }


        
        } catch (err) {
            console.error(err)
        }
    }

    return <Form 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label='Login'
        onSubmit={onSubmit}
        alert={alert}
        />
    }


const Register = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3001/auth/register', {
                username:username,
                password:password,
            });
            
            alert("Registration Completed: Now login.")
        } catch (err) {
            console.error(err)
        }
        
    }



    return <Form 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label='Register'
        onSubmit={onSubmit}
        />
}

const Form = ({username, setUsername, password, setPassword, label, onSubmit, alert}) => {
    return  (
        <div className='auth-container'>
            <form onSubmit={onSubmit}>
                <h2>
                {label}
                </h2>
                <div className='form-group'>
                    <label htmlFor="username">Username :</label>
                    <input type='text'
                        value={username}
                        id='username'
                        onChange={(event) => setUsername(event.target.value)} />
                        <span>{alert}</span>
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password:</label>
                    <input type='password'
                        id='password' 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}   />
                        <span>{alert}</span>
                </div>
                <button type='submit'>{label}</button>
            </form>
        </div>
)}

export default Auth