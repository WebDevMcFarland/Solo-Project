import React from 'react';
import './Login.css'

function Login() {

    const createAccount = () => {
        window.location.href ='/register'
    }
    
    return(
        <div className="login-page">
        <div className='title'>LOGIN</div>
        <form className="login-form" method='POST' action='/login'>
            <div className="login-input">
                <label htmlFor="username">Username: </label>
                <input name='username' type="text" id='username' placeholder='Username' required />
            </div>
            <div className="login-input">
                <label htmlFor="password">Password: </label>
                <input name="password" type="password" id='password' placeholder='Password' required />
            </div>
            <input className="login-submit" type="submit" id='login-button' value='Login' />
        </form>
        <input className="login-submit-register-submit" type="submit" id='register-button' value='Create an account?' action='/register' onClick={createAccount}/>
    </div>
    )
}
export default Login;