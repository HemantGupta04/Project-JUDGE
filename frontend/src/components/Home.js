import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to our App!</h1>
            <p>Our app is designed to help you practice coding problems and improve your programming skills.</p>
            <div className="home-links">
                <div className="home-link">
                    <h2>Get Started</h2>
                    <p><a href="/register">Register</a> or <a href="/login">Login</a> to start solving problems.</p>
                </div>
                <div className="home-link">
                    <h2>Problems</h2>
                    <p><a href="/problems">Browse Problems</a> and test your skills.</p>
                </div>
                <div className="home-link">
                    <h2>Compiler</h2>
                    <p><a href="/compiler">Use our Online Compiler</a> to run your code.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
