import React from 'react';
import { useParams } from 'react-router-dom';
import ProblemDetails from './ProblemDetails';
import Compiler from './Compiler';
import './ProblemWithCompiler.css';

const ProblemWithCompiler = () => {
    const { id } = useParams();

    return (
        <div className="problem-with-compiler">
            <div className="problem-details">
                <ProblemDetails problemId={id} />
            </div>
            <div className="compiler-section">
                <Compiler />
            </div>
        </div>
    );
};

export default ProblemWithCompiler;
