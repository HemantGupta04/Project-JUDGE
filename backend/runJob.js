import { generateInputFile } from './generateInputFile.js'; // Adjust the path to your generateInputFile.js
import { executeCpp } from './executeCpp.js'; // Adjust the path to your executeCpp.js

const cppFilePath = './cppFile.cpp'; // Adjust the path to your C++ file
const inputContent = "3 4"; // Example input content

const runJob = async () => {
  try {
    // Generate the input file
    const inputFilePath = await generateInputFile(inputContent);
    console.log(`Input file created at: ${inputFilePath}`);

    // Compile and run the C++ code with the input file
    const output = await executeCpp(cppFilePath, inputFilePath);
    console.log(`Output: ${output}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

runJob();
