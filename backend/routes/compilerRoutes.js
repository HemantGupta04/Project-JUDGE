// compilerRoutes.js

import express from 'express';
import { compileCode, executeCode } from '../controllers/compilerController.js';

const router = express.Router();

router.post('/compile', compileCode);
router.post('/execute', executeCode);

export default router;
