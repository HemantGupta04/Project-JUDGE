import express from 'express';
import { createProblem, getProblems, getProblemById, deleteProblem } from '../controllers/problemController.js';

const router = express.Router();

router.post('/create-problem', createProblem);
router.get('/problems', getProblems);
router.get('/problems/:id', getProblemById);
router.delete('/problems/:id', deleteProblem);

export default router;
