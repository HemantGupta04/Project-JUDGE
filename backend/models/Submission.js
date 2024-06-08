import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
    problem_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    language: String,
    code: String,
    input_file: String, // Path to the input file provided by the user
    output_file: String, // Path to the expected output file provided by the problem setter
    status: String,
    time_taken: Number,
    memory_used: Number,
    submitted_at: { type: Date, default: Date.now() }
});

const Submission = mongoose.model('Submission', SubmissionSchema);

export default Submission;
