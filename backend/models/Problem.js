import mongoose from 'mongoose';

const ProblemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type:[String],
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    sampleTestCase: {
        type: String,
        required: true,
    },
    inputFile: {
        type: String,
        required: true,
    },
    outputFile: {
        type: String,
        required: true,
    },
});

const Problem = mongoose.model('Problem', ProblemSchema);

export default Problem;
