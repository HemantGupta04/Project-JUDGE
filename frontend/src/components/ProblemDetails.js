import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProblemDetails = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/problems/${id}`);
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
        <div>
            <h2>{problem.title}</h2>
            <p>{problem.description}</p>
            <p>Tags: {problem.tags}</p>
            <p>Difficulty: {problem.difficulty}</p>
            <h3>Sample Test Case</h3>
            <pre>{problem.sampleTestCase}</pre>
        </div>
    );
};

export default ProblemDetails;
