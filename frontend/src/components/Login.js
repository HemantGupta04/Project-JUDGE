import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('email', email);
            setMessage(response.data.message);
            const isAdmin = email === 'heemantgupta2014@gmail.com';
            localStorage.setItem('isAdmin', isAdmin);
            navigate('/problems', { state: { isAdmin } });
        } catch (error) {
            setMessage(error.response?.data || 'An error occurred');
        }
    };

    return (
        <div className="container">
        <div className="image-section">
          {/* <img src={image2} alt="Background" className="image" /> */}
        </div>
        <div className="form-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
    
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='email'
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='password'
              />
            </div>
            <button type="submit">Login</button>
          </form>
           {message && <p>{message}</p>}
        </div>
      </div>
    );
};

export default Login;
