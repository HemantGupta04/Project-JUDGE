import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './Problems.css';

const Problems = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');

    const handleCompile = async () => {
        try {
            // Call backend API to compile code
            const response = await axios.post('http://localhost:4000/api/compile', { code });
            console.log(response.data); // Handle response
            setOutput(response.data.output);
        } catch (error) {
            console.error('Error compiling code:', error);
        }
    };

    return (
        <div className="box">
            <h2>Problem Section</h2>
            <textarea value={code} onChange={(e) => setCode(e.target.value)}></textarea>
            <button onClick={handleCompile}>Compile</button>
            {output && <pre>{output}</pre>}
        </div>
    );
};

export default Problems;
