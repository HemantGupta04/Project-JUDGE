import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import path from 'path';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { DBConnection } from './database/db.js';
import { generateFile } from './generateFile.js';
import { generateInputFile } from './generateInputFile.js';
import { executeCpp } from './executeCpp.js';
import User from './models/User.js';
import problemRoutes from './routes/problemRoutes.js';
import Submission from './models/Submission.js';
import dotenv from 'dotenv';
// import fs from 'fs/promises';
import Problem from './models/Problem.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import axios from 'axios';
import compareOutputs from './compare.js';

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({ path: './../ONLINEJUDGE/backend/.env' });

const app = express();
const upload = multer(); // Initialize multer for file uploads
app.use(cors({
    origin: 'https://project-online-judge.vercel.app/', // Replace with your frontend URL
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));

DBConnection();

app.get("/", (req, res) => {
    res.send("Hello, world!!");
});

console.log(process.env.SECRET_KEY);
console.log(process.env.PORT);
app.post("/register", async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("Please enter all the info.");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists with this email.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        user.token = token;
        user.password = undefined;
        res.status(200).json({ message: 'You have successfully registered!', user });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("Please enter all the info.");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Password does not match");
        }

        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Server error" });
    }
});

app.post("/run", async (req, res) => {
    const { language = 'cpp', code, input } = req.body;

    if (!code) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
    }

    try {
        // Generate code file based on the language
        const filePath = await generateFile(language, code);

        // Generate input file
        const inputPath = await generateInputFile(input);

        // Execute the C++ code with the input file
        const output = await executeCpp(filePath, inputPath);

        res.json({ filePath, output });
    } catch (error) {
        console.error(`Error during code execution: ${error.message}`);
        res.status(500).json({ success: false, error: error.message, line: error.line });
    }
});

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { problem_id, user_id, language, code } = req.body;
        const file = req.file;

        // Handle case where no file is uploaded
        if (!file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        // Generate code file from user submission
        const filePath = await generateFile(language, code);

        // Execute user code
        const inputFilePath = path.join('uploads', 'input.txt'); // assuming input.txt is provided
        const output = await executeCpp(filePath, inputFilePath);

        // Save the output to solution.txt
        const solutionFilePath = path.join('uploads', 'solution.txt');
        await fs.writeFile(solutionFilePath, output);

        // Read the expected output
        const expectedOutputFilePath = path.join('uploads', 'expected_output.txt'); // assuming expected_output.txt is provided
        const expectedOutput = await fs.readFile(expectedOutputFilePath, 'utf8');

        // Compare the generated solution with the expected output
        const isCorrect = output.trim() === expectedOutput.trim();

        // Save submission to the database
        const submission = await Submission.create({
            problem_id,
            user_id,
            language,
            code,
            output,
            status: isCorrect ? 'correct' : 'incorrect'
        });

        res.status(201).json({ success: true, message: 'Submission successful!', submission });
    } catch (error) {
        console.error('Error submitting code:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
app.post("/submitCode", async (req, res) => {
    const { id, code } = req.body;

    try {
        // Add logging to debug issues
        console.log('Received submission for problem:', id);
        console.log('Code:', code);

        const problem = await Problem.findById(id);

        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        console.log('**********12');
        console.log(__dirname);

        // Construct the correct paths to the input and output files
        const inputFile = path.join(__dirname, 'uploads', problem.title, 'input', `${problem.title}_input.txt`);
        const expectedOutputFile = path.join(__dirname, 'uploads', problem.title, 'output', `${problem.title}_output.txt`);

        console.log('Input file path:', inputFile);
        console.log('Expected output file path:', expectedOutputFile);

        // Read the contents of the input and output files
        const inputFileContent = fs.readFileSync(inputFile, 'utf-8');
        const expectedOutputContent = fs.readFileSync(expectedOutputFile, 'utf-8');

        console.log('Input file content:', inputFileContent);
        console.log('Expected output content:', expectedOutputContent);

        console.log('**********00');


        const payload = {
            language: 'cpp',
            code,
            input: inputFileContent,
        };

        // Log the payload being sent to the code execution service
        console.log('Payload for code execution:', payload);

        const { data } = await axios.post('http://localhost:4000/run', payload);
        const actualOutput = data.output.trim();

        // Simulate reading the expected output from a file or database
        const expectedOutput = expectedOutputContent.trim();
        const input = inputFileContent.trim();
        console.log('********');
        console.log(expectedOutput);
        console.log('********');
        console.log(actualOutput);
        const passed = compareOutputs(actualOutput,expectedOutput);

        res.json({
            passed,
            results: {
                input,
                expectedOutput,
                actualOutput,
                passed,
            },
        });
    } catch (error) {
        console.error('Error during code submission:', error);
        res.status(500).json({ error: 'Error occurred during code submission.' });
    }
});


app.get("/api/submissions", async (req, res) => {
    try {
        const submissions = await Submission.find().populate('problem_id').populate('user_id');
        res.status(200).json({ success: true, submissions });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.get("/api/submissions/:id", async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id).populate('problem_id').populate('user_id');
        if (submission) {
            res.status(200).json({ success: true, submission });
        } else {
            res.status(404).json({ success: false, error: 'Submission not found' });
        }
    } catch (error) {
        console.error('Error fetching submission details:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.use('/api', problemRoutes); // Use problem routes

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
