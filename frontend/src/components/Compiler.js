import React, { useState } from 'react';
import axios from 'axios';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism.css';
import { useNavigate } from 'react-router-dom';
import './Compiler.css'; 

const Compiler = ({ problemId }) => {
    const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    int num1, num2, sum;
    cin >> num1 >> num2;
    sum = num1 + num2;
    cout << "The sum of the two numbers is: " << sum;
    return 0;
}`);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRun = async () => {
        const payload = {
            language: 'cpp',
            code,
            input
        };

        setLoading(true);

        try {
            const { data } = await axios.post('http://localhost:4000/run', payload);
            setOutput(data.output);
        } catch (error) {
            console.log(error.response);
            setOutput('Error occurred during code execution.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        localStorage.setItem('submittedCode', code);
        navigate(`/submission/${problemId}`);
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
        </div>
    );
};

export default Compiler;
