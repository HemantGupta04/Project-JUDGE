import React, { useState } from 'react';
import axios from 'axios';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism.css';
import './Compiler.css'; 
import { useParams } from 'react-router-dom';
const host = process.env.REACT_APP_BACKEND_URL;

const Compiler = ({ problemId }) => {
    const [code, setCode] = useState(`#include <iostream> 
using namespace std; 
int main() {
    int t;
    cin>>t;
    while(t--){
       // your code{pls remove this line}
    } 
    return 0; 
} `);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        const payload = {
            language: 'cpp',
            code,
            input
        };

        setLoading(true);

        try {
            const { data } = await axios.post(`⁠ ${host}/run ⁠`, payload);
            setOutput(data.output);
        } catch (error) {
            console.log(error.response);
            setOutput('Error occurred during code execution.');
        } finally {
            setLoading(false);
        }
    };
    
    const { id } = useParams();
    const handleSubmit = async () => {
        console.log(id);
        setLoading(true);
        try {
            const { data } = await axios.post(`⁠${host}/submitCode`, {id, code });
            setResults([data.results]);
            console.log('Submission result:', data); // Assume one test case based on your example
        } catch (error) {
            console.log(error.response);
            setResults([{ error: 'Error occurred during code submission.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="compiler-container">
            <div className="editor-section">
                <h1>Online Code Compiler</h1>
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlight(code, languages.cpp)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        backgroundColor: '#f7fafc',
                        height: '300px',
                        overflowY: 'auto'
                    }}
                />
                <button onClick={handleRun} disabled={loading}>
                    {loading ? 'Running...' : 'Run Code'}
                </button>
                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Code'}
                </button>
            </div>
            <div className="io-section">
                <div className="input-section">
                    <h2>Input</h2>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter input"
                        rows="5"
                        cols="15"
                    />
                </div>
                <div className="output-section">
                    <h2>Output</h2>
                    <pre>{output}</pre>
                </div>
            </div>
            <div className="results-section">
                <h2>Results</h2>
                {results.length > 0 && results.map((result, index) => (
                    <div key={index} className={`result ${result.passed ? 'passed' : 'failed'}`}>
                        <h3>Test Case {index + 1}</h3>
                        <p><strong>Input:</strong> {result.input}</p>
                        <p><strong>Expected Output:</strong> {result.expectedOutput}</p>
                        <p><strong>Actual Output:</strong> {result.actualOutput}</p>
                        <p><strong>Status:</strong> {result.passed ? 'Passed' : 'Failed'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Compiler;
