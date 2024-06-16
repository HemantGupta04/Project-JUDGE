import React, { useState } from 'react';
import axios from 'axios';
const host = process.env.REACT_APP_BACKEND_URL;
const SubmissionComponent = () => {
    const [code, setCode] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${host}/api/submit-code`, {
                problem_id: 'someProblemId',
                user_id: 'someUserId',
                language: 'cpp',
                code,
                expectedOutput: 'expected output here',
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
            <textarea value={code} onChange={(e) => setCode(e.target.value)} />
            <button onClick={handleSubmit}>Submit Code</button>
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

export default SubmissionComponent;
