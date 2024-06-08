import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import path from 'path';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { DBConnection } from './database/db.js';
import { generateFile } from './generateFile.js';
import { generateInputFile } from './generateInputFile.js';
import { executeCpp } from './executeCpp.js';
import User from './models/User.js';
import problemRoutes from './routes/problemRoutes.js';
import Submission from './models/Submission.js';
import dotenv from 'dotenv';

dotenv.config({ path: './../ONLINE_JUDGE/backend/.env' });

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

DBConnection();

app.get("/", (req, res) => {
    res.send("Hello, world!!");
});

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
app.post("/api/submit-code", async (req, res) => {
    try {
        // Extract data from request body
        const { problem_id, user_id, language, code } = req.body;
        
        // Save submission to the database
        const submission = await Submission.create({ problem_id, user_id, language, code, status: 'pending' });

        // Send response
        res.status(201).json({ success: true, message: 'Submission successful!', submission });
    } catch (error) {
        console.error('Error submitting code:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Get submissions endpoint
app.get("/api/submissions", async (req, res) => {
    try {
        // Fetch all submissions
        const submissions = await Submission.find().populate('problem_id').populate('user_id');
        
        // Send response
        res.status(200).json({ success: true, submissions });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Get submission details endpoint
app.get("/api/submissions/:id", async (req, res) => {
    try {
        // Fetch submission details by ID
        const submission = await Submission.findById(req.params.id).populate('problem_id').populate('user_id');
        
        // Send response
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
