import express from 'express';
import multer from 'multer';
import path from 'path';
import Problem from '../models/Problem.js';
import { saveUploadedFile } from '../utils/saveUploadedFile.js'; // Import the saveUploadedFile function

const router = express.Router();
const upload = multer(); // Initialize multer for file uploads

// Route for creating a new problem with file uploads
router.post('/problems', upload.fields([{ name: 'inputFile', maxCount: 1 }, { name: 'outputFile', maxCount: 1 }]), async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Uploaded Files:', req.files);

        const { title, description, tags, difficulty, sampleTestCase } = req.body;

        const inputFile = req.files['inputFile'] ? req.files['inputFile'][0] : null;
        const outputFile = req.files['outputFile'] ? req.files['outputFile'][0] : null;

        if (!inputFile || !outputFile) {
            return res.status(400).json({ success: false, message: 'Input and output files are required' });
        }

        const inputFilePath = await saveUploadedFile(inputFile, title, 'input');
        const outputFilePath = await saveUploadedFile(outputFile, title, 'output');

        const newProblem = new Problem({
            title,
            description,
            tags,
            difficulty,
            sampleTestCase,
            inputFile: inputFilePath,  // Correctly assign the file paths
            outputFile: outputFilePath,

        });

        await newProblem.save();

        res.status(201).json({ success: true, message: 'Problem created successfully', problem: newProblem });
    } catch (error) {
        console.error('Error creating problem:', error);
        res.status(500).json({ success: false, message: 'Error creating problem' });
    }
});

// Get all problems
router.get('/problems', async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a specific problem
router.get('/problems/:id', async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json(problem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a problem
router.delete('/problems/:id', async (req, res) => {
    try {
        const problem = await Problem.findByIdAndDelete(req.params.id);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json({ message: 'Problem deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }
        const filePath = await saveUploadedFile(req.file, req.body.questionTitle, req.body.type);
        console.log(filePath);
        res.status(200).json({ success: true, filePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to upload file' });
    }
});

export default router;
