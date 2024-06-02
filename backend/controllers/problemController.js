import Problem from '../models/Problem.js';

export const createProblem = async (req, res) => {
    try {
        const newProblem = new Problem(req.body);
        await newProblem.save();
        res.status(201).json(newProblem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create problem' });
    }
};

export const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch problems' });
    }
};

export const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json(problem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch problem' });
    }
};

export const deleteProblem = async (req, res) => {
    try {
        const { id } = req.params;
        await Problem.findByIdAndDelete(id);
        res.status(200).json({ message: 'Problem deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting problem' });
    }
};
