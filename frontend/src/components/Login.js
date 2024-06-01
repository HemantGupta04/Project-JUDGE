import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import login.css

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });
      console.log(response.data);
      setSuccess('Successfully logged in!');
      setError(null);

      // Wait for 5 seconds before redirecting to home page
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 5000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed, please try again.');
      }
      setSuccess(null);
      setLoading(false);
    }
  };

  return (
    <div className="container"> {/* Apply container class */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> {/* Apply form-group class */}
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group"> {/* Apply form-group class */}
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p className="error">{error}</p>} {/* Apply error class */}
      {success && <p className="success">{success} Redirecting to home page...</p>} {/* Apply success class */}
      {loading && <div className="spinner"></div>} {/* Apply spinner class */}
    </div>
  );
};

export default Login;
