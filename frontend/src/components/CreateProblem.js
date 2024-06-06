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

    const handleCompile = async (code) => {
        try {
            // Call backend API to compile code
            const response = await axios.post('http://localhost:4000/api/compile', { code });
            console.log(response.data); // Handle response
        } catch (error) {
            console.error('Error compiling code:', error);
        }
    };

    return (
        <div className="create-problem-container">
            <h2>Create Problem</h2>
            <form onSubmit={handleSubmit}>
                {/* Form inputs */}
                <button type="submit">Create</button>
            </form>
            {message && <p>{message}</p>}
            <div>
                <h2>Compile Code</h2>
                <textarea value={sampleTestCase} onChange={(e) => setSampleTestCase(e.target.value)}></textarea>
                <button onClick={() => handleCompile(sampleTestCase)}>Compile</button>
            </div>
        </div>
    );
};

export default CreateProblem;
