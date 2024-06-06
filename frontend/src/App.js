import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Problems from './components/Problems';
import ProblemDetails from './components/ProblemDetails';
import CreateProblem from './components/CreateProblem';
import Compiler from './components/Compiler'; // Import the Compiler component

function App() {
    // const isAdmin = localStorage.getItem('email') === 'heemantgupta2014@gmail.com';

    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/problems">Problems</Link></li>
                    {/* {isAdmin && <li><Link to="/create-problem">Create Problem</Link></li>} */}
                    <li><Link to="/compiler">Compiler</Link></li> {/* Add a link to the Compiler */}
                </ul>
            </nav>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/problems/:id" element={<ProblemDetails />} />
                <Route path="/create-problem" element={<CreateProblem />} />
                <Route path="/compiler" element={<Compiler />} /> {/* Add a route for the Compiler */}
                <Route path="/" element={<h1>Welcome to our App!</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
