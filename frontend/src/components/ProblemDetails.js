import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import SubmissionForm from './SubmissionForm';
const host = process.env.REACT_APP_BACKEND_URL;

const ProblemDetails = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    console.log(id);
    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`${host}/api/problems/${id}`);
                setProblem(response.data);
            } catch (error) {
                console.error('Error fetching problem details:', error);
            }
        };

        fetchProblem();
    }, [id]);

    if (!problem) {
        return <p>Loading...</p>;
    }

    return (
        <div className='prob'>
            <h2>{problem.title}</h2>
            <p>{problem.description}</p>
            <p>Tags: {problem.tags}</p>
            <p>Difficulty: {problem.difficulty}</p>
            <h3>Sample Test Case</h3>
            <pre>{problem.sampleTestCase}</pre>
            
            {/* Integration of SubmissionForm component */}
            {/* <SubmissionForm problemId={id} /> */}
        </div>
    );
};

export default ProblemDetails;
