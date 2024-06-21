import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateProblem.css';
const host = process.env.REACT_APP_BACKEND_URL;

const CreateProblem = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [sampleTestCase, setSampleTestCase] = useState('');
    const [inputFile, setInputFile] = useState(null);
    const [outputFile, setOutputFile] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('tags', tags);
            formData.append('difficulty', difficulty);
            formData.append('sampleTestCase', sampleTestCase);
            formData.append('inputFile', inputFile);
            formData.append('outputFile', outputFile);

            await axios.post(`${host}/api/problems`, formData);

            setMessage('Problem created successfully!');
            setTimeout(() => {
                navigate('/problems', { state: { isAdmin: true, message: 'Problem created successfully!' } });
            }, 2000);
        } catch (error) {
            console.error('Error creating problem:', error);
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
                <div>
                    <label>Input File:</label>
                    <input
                        type="file"
                        accept=".txt"
                        onChange={(e) => setInputFile(e.target.files[0])}
                        required
                    />
                </div>
                <div>
                    <label>Output File:</label>
                    <input
                        type="file"
                        accept=".txt"
                        onChange={(e) => setOutputFile(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit">Create</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateProblem;
