// routes/submissionRoutes.js

import express from 'express';
import Submission from '../models/Submission.js';

const router = express.Router();

router.post('/submit', async (req, res) => {
    try {
        const { problem_id, user_id, language, code } = req.body;

        // Save submission to the database
        const submission = await Submission.create({ problem_id, user_id, language, code, status: 'pending' });

        // Process submission here (execute code with input files, compare output, update status)

        // Send response
        res.status(201).json({ success: true, message: 'Submission successful!', submission });
    } catch (error) {
        console.error('Error submitting code:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

export default router;
