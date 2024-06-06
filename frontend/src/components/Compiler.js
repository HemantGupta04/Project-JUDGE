import React, { useState } from 'react';
import axios from 'axios';

const Compiler = () => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp'); // Default language is C++
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true while waiting for the response
        setError(''); // Reset error state

        try {
            const response = await axios.post('/run', { language, code, input });
            setOutput(response.data.output);
        } catch (error) {
            console.error('Error executing code:', error);
            setError('Error occurred during code execution.');
        } finally {
            setLoading(false); // Reset loading state after receiving the response
        }
    };

    return (
        <div>
            <h2>Code Compiler</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="code">Code:</label>
                    <textarea id="code" value={code} onChange={(e) => setCode(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="language">Language:</label>
                    <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        {/* Add other language options here */}
                    </select>
                </div>
                <div>
                    <label htmlFor="input">Input:</label>
                    <textarea id="input" value={input} onChange={(e) => setInput(e.target.value)} />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Running...' : 'Run Code'}
                </button>
            </form>
            {error && <div>Error: {error}</div>} {/* Display error message if there is an error */}
            {output && (
                <div>
                    <h3>Output:</h3>
                    <pre>{output}</pre>
                </div>
            )}
        </div>
    );
};

export default Compiler;
