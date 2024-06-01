import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import Navbar from './Navbar'; // Import Navbar
import Footer from './Footer'; // Import Footer

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/register', {
        firstname,
        lastname,
        email,
        password,
      });
      console.log(response.data);
      setSuccess(response.data.message);
      setError(null);

      // Wait for 1 minute (60,000 milliseconds) before redirecting to login page
      setTimeout(() => {
        navigate('/login');
      }, 60000);

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed, please try again.');
      }
      setSuccess(null);
    }
  };

  return (
    <div id="root">
      <Navbar /> {/* Include Navbar */}
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success} Redirecting to login page...</p>}
      </div>
      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default Register;
