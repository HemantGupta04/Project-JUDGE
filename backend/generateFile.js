import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Convert the import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dirCodes = path.join(__dirname, 'codes');

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

/**
 * Generates a file with the provided content and format.
 * @param {string} format - The format of the file (e.g., "cpp", "txt").
 * @param {string} content - The content to be written to the file.
 * @returns {Promise<string>} - The path to the generated file.
 */
const generateFile = async (format, content) => {
  try {
    const jobID = uuid();
    const filename = `${jobID}.${format}`;
    const filePath = path.join(dirCodes, filename);
    await fs.promises.writeFile(filePath, content);
    console.log(`File created at: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error(`Failed to create file: ${error.message}`);
    throw error;
  }
};

export { generateFile };
