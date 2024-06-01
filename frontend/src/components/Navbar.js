import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS for Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyApp</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
