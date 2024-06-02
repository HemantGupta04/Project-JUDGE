import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './Problems.css';

const Problems = () => {
    const [problems, setProblems] = useState([]);
    const location = useLocation();
    const isAdmin = location.state?.isAdmin || false;
    const [message, setMessage] = useState(location.state?.message || '');

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/problems');
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
                await axios.delete(`http://localhost:4000/api/problems/${id}`);
                setProblems(problems.filter(problem => problem._id !== id));
            } catch (error) {
                console.error('Error deleting problem:', error);
            }
        }
    };

    return (
        <div className="box">
            <h2>Problem Section</h2>
            {message && <p>{message}</p>}
            {isAdmin && (
                <div>
                    <Link to="/create-problem">
                        <button>Create Problem</button>
                    </Link>
                </div>
            )}
            {problems.length > 0 ? (
                <ul className="problem-list">
                    {problems.map((problem) => (
                        <li className="problem" key={problem._id}>
                            <div className="problem-details">
                                <Link to={`/problems/${problem._id}`}>
                                    <span className="problem-title">{problem.title}</span>
                                </Link>
                                <span className="problem-tags">{problem.tags}</span>
                                <span className="difficulty">{problem.difficulty}</span>
                            </div>
                            {isAdmin && (
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(problem._id)}
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
