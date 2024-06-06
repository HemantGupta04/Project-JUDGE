import React, { useState } from 'react';
import axios from 'axios';

const Compiler = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/run', { language, code, input });
      setOutput(response.data.output);
    } catch (error) {
      setError('Error executing code. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h2>Code Compiler</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Language:</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            {/* Add more language options here */}
          </select>
        </div>
        <div>
          <label>Code:</label>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} required />
        </div>
        <div>
          <label>Input:</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <button type="submit" disabled={isLoading}>{isLoading ? 'Executing...' : 'Execute'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Compiler;
