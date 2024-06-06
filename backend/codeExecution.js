import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, 'outputs');

// Ensure the outputs directory exists
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

/**
 * Executes the provided code file with optional input file.
 * @param {string} language - Language of the code (e.g., 'cpp').
 * @param {string} code - Code content to be executed.
 * @param {string} [input] - Input content (optional).
 * @returns {Promise<string>} - Output of the code execution.
 */
const executeCode = (language, code, input = '') => {
  return new Promise((resolve, reject) => {
    // Generate a unique file name
    const fileName = `code.${language}`;
    const filePath = path.join(outputPath, fileName);

    // Write the code content to the file
    fs.writeFile(filePath, code, (err) => {
      if (err) {
        reject(`Error writing code to file: ${err}`);
      } else {
        // Compile and execute the code based on the language
        const compileCommand = language === 'cpp' ? `g++ ${filePath} -o ${filePath}.out` : '';
        const runCommand = language === 'cpp' ? `${filePath}.out` : '';

        exec(compileCommand, (compileErr) => {
          if (compileErr) {
            reject(`Compilation error: ${compileErr}`);
          } else {
            exec(`${runCommand} ${input}`, (runErr, stdout, stderr) => {
              if (runErr) {
                reject(`Execution error: ${runErr}`);
              } else {
                resolve(stdout);
              }
            });
          }
        });
      }
    });
  });
};

export { executeCode };
