import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Problems from './components/Problems';
import ProblemDetails from './components/ProblemDetails';
import CreateProblem from './components/CreateProblem';
import Compiler from './components/Compiler';
import ProblemWithCompiler from './components/ProblemWithCompiler';
import SubmissionPage from './components/SubmissionPage'; // Import the new component
import Home from './components/Home';
import './App.css';
import logo from './logo.png';

function App() {
    // const isAdmin = localStorage.getItem('email') === 'heemantgupta2014@gmail.com';
    const firstname = localStorage.getItem('firstname');

    return (
        <Router>
            <nav className="navbar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/problems">Problems</Link></li>
                    {/* {isAdmin && <li><Link to="/create-problem">Create Problem</Link></li>} */}
                    {/* <li><Link to="/compiler">Compiler</Link></li> */}
                </ul>
                <img src={logo} alt="Logo" className="logo" />
                {firstname && <span className="welcome-message">Welcome, {firstname}</span>}
            </nav>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/problems/:id" element={<ProblemDetails />} />
                <Route path="/create-problem" element={<CreateProblem />} />
                <Route path="/compiler" element={<Compiler />} />
                <Route path="/problems/:id/compiler" element={<ProblemWithCompiler />} /> {/* New route */}
                <Route path="/submission/:problemId" element={<SubmissionPage />} /> {/* Route for submission page */}
                <Route path="/" element={<Home />} /> {/* Home page route */}
            </Routes>
            <footer className="footer">
                <p>&copy; 2024 Online Judge. All rights reserved.</p>
            </footer>
        </Router>
    );
}

export default App;
