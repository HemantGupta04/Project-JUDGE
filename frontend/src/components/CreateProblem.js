import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateProblem.css';

const CreateProblem = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [sampleTestCase, setSampleTestCase] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:4000/api/create-problem', 
            { title, description, tags, difficulty, sampleTestCase },
            { headers: { Authorization: `Bearer ${token}` } });
            setMessage('Problem created successfully!');
            setTimeout(() => {
                navigate('/problems', { state: { isAdmin: true, message: 'Problem created successfully!' } });
            }, 2000);
        } catch (error) {
            setMessage('Error creating problem');
        }
    };

    return (
        <div className="create-problem-container">
            <h2>Create Problem</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Tags:</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Difficulty:</label>
                    <input
                        type="text"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Sample Test Case:</label>
                    <textarea
                        value={sampleTestCase}
                        onChange={(e) => setSampleTestCase(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Create</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateProblem;
