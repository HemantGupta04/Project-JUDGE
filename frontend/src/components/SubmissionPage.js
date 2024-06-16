import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const host = process.env.REACT_APP_BACKEND_URL;

const SubmissionPage = () => {
    const { problemId } = useParams(); // Get the problemId from the URL
    const [code, setCode] = useState('');
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('problem_id', problemId);
        formData.append('user_id', 'someUserId'); // Replace with actual user ID
        formData.append('language', 'cpp'); // Replace with actual language
        formData.append('code', code); // Append the code if necessary

        try {
            const response = await axios.post(`${host}/api/submit-code`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { success, message, submission } = response.data;
            setResult({ success, message, submission });
        } catch (error) {
            console.error('Error submitting code:', error);
            setResult({ success: false, message: 'Submission failed' });
        }
    };

    return (
        <div>
            <h2>Submit your solution for problem {problemId}</h2>
            <form onSubmit={handleSubmit}>
                <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter your code here" />
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Submit Code</button>
            </form>
            {result && (
                <div>
                    <p>{result.message}</p>
                    {result.submission && (
                        <pre>{JSON.stringify(result.submission, null, 2)}</pre>
                    )}
                </div>
            )}
        </div>
    );
};

export default SubmissionPage;
