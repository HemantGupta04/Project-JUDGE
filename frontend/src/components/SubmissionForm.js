// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const SubmissionForm = ({ problemId }) => {
//     const [code, setCode] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [submissionResult, setSubmissionResult] = useState('');
//     const userId = localStorage.getItem('userId'); // Set userId from localStorage
//     const navigate = useNavigate(); // Import useNavigate for navigation

//     const handleSubmission = async () => {
//         setLoading(true);

//         try {
//             // First, compile the code
//             const compileResponse = await axios.post('/api/compile-code', {
//                 code,
//             });

//             // If compilation is successful, proceed with submission
//             if (compileResponse.data.success) {
//                 const submissionResponse = await axios.post('/api/submit-code', {
//                     problem_id: problemId,
//                     userId,
//                     code,
//                 });

//                 // Handle submission result
//                 setSubmissionResult(submissionResponse.data.message);
//                 navigate('/submission-success'); // Redirect to submission success page
//             } else {
//                 // If compilation fails, set the compilation error message
//                 setSubmissionResult('Compilation failed. Please fix errors in your code.');
//             }
//         } catch (error) {
//             console.error('Error submitting code:', error);
//             setSubmissionResult('Error: Submission failed');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <label htmlFor="code">Enter your code:</label>
//                 <textarea id="code" value={code} onChange={(e) => setCode(e.target.value)} rows={10} cols={50} />
//             </div>
//             <div>
//                 <button onClick={handleSubmission} disabled={loading}>Submit</button>
//             </div>
//             {loading && <p>Loading...</p>}
//             {submissionResult && <p>{submissionResult}</p>}
//         </div>
//     );
// };

// export default SubmissionForm;
