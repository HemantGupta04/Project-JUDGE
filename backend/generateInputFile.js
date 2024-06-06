import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the inputs directory
const dirInputs = path.join(__dirname, 'inputs');

// Ensure the inputs directory exists
if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, { recursive: true });
}

/**
 * Generates an input file with the provided content.
 * @param {string} input - The content to be written to the input file.
 * @returns {Promise<string>} - The path to the generated input file.
 */
const generateInputFile = async (input) => {
  try {
    const jobID = uuid(); // Generate a unique job ID.
    const inputFilename = `${jobID}.txt`;
    const inputFilePath = path.join(dirInputs, inputFilename);

    // Write the input content to the file.
    await fs.promises.writeFile(inputFilePath, input);

    console.log(`Input file created at: ${inputFilePath}`);
    return inputFilePath;
  } catch (error) {
    console.error(`Failed to create input file: ${error.message}`);
    throw error;
  }
};

export { generateInputFile };
