import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Problems.css';
const host = process.env.REACT_APP_BACKEND_URL;

const Problems = () => {
    const [problems, setProblems] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const isAdmin = location.state?.isAdmin || false;
    const [message, setMessage] = useState(location.state?.message || '');

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get(`${host}/api/problems`);
                setProblems(response.data);
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
        };

        fetchProblems();
    }, []);

    const handleDelete = async (id) => {
        const confirmation = window.confirm("Are you sure you want to delete this problem?");
        if (confirmation) {
            try {
                await axios.delete(`${host}/api/problems/${id}`);
                setProblems(problems.filter(problem => problem._id !== id));
            } catch (error) {
                console.error('Error deleting problem:', error);
            }
        }
    };

    const handleProblemClick = (id) => {
        navigate(`/problems/${id}/compiler`);
    };

    return (
        <div className="box">
            <h2>Problem Section</h2>
            {message && <p>{message}</p>}
            {isAdmin && (
                <div className='create'>
                    <Link to="/create-problem">
                        <button>Create Problem</button>
                    </Link>
                </div>
            )}
            {problems.length > 0 ? (
                <ul className="problem-list">
                    {problems.map((problem) => (
                        <li className="problem" key={problem._id} onClick={() => handleProblemClick(problem._id)}>
                            <div className="problem-details">
                                <span className="problem-title">{problem.title}</span>
                            </div>
                            <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                                {problem.difficulty}
                            </span>
                            {isAdmin && (
                                <button
                                    className="delete-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(problem._id);
                                    }}
                                >
                                    D
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No problems available</p>
            )}
        </div>
    );
};

export default Problems;