import React from 'react';
import './Home.css';

const login = () => {
    window.location.href='/login';
};

const register = () => {
    window.location.href='/register';
};


function Home() {
    return(
        
        <section className='home'>
        <h1 className='title'>WELCOME TO THE RECIPE APP</h1>

        <div className='buttons'>
          <div>
            <button className='login' onClick={login}>Login</button>
          </div>
          <div>
            <button className='register' onClick={register}>Register</button>
          </div>
        </div>

        </section>
        
    )
}

export default Home;