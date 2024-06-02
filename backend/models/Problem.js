import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: String, required: true },
    difficulty: { type: String, required: true },
    sampleTestCase: { type: String, required: true },
}, { timestamps: true });

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;
