import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Convert the import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = path.join(__dirname, 'outputs');

// Ensure the outputs directory exists
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

/**
 * Compiles and executes a C++ file, optionally taking an input file.
 * @param {string} filepath - The path to the C++ file to compile and execute.
 * @param {string} [inputPath] - The path to the input file (optional).
 * @returns {Promise<string>} - The stdout from executing the compiled program.
 */
const executeCpp = (filepath, inputPath = '') => {
  return new Promise((resolve, reject) => {
    const jobId = path.basename(filepath).split('.')[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    const compileCommand = `g++ ${filepath} -o ${outPath}`;

    console.log(`Compiling with command: ${compileCommand}`);

    exec(compileCommand, (compileError, compileStdout, compileStderr) => {
      if (compileError) {
        console.error(`Compilation error: ${compileError}`);
        const errorLine = parseErrorLine(compileStderr);
        reject({ error: compileError.message, stderr: compileStderr, line: errorLine });
        return;
      }

      if (compileStderr) {
        console.error(`Compilation stderr: ${compileStderr}`);
      }

      const runCommand = inputPath ? `${outPath} < ${inputPath}` : `${outPath}`;
      console.log(`Executing with command: ${runCommand}`);

      exec(runCommand, (runError, runStdout, runStderr) => {
        if (runError) {
          console.error(`Execution error: ${runError}`);
          reject({ error: runError.message, stderr: runStderr });
          return;
        }

        if (runStderr) {
          console.error(`Execution stderr: ${runStderr}`);
          reject(runStderr);
          return;
        }

        resolve(runStdout);
      });
    });
  });
};

/**
 * Parses the compilation error to find the line number of the error.
 * @param {string} stderr - The stderr from the compilation process.
 * @returns {number|null} - The line number of the error, or null if not found.
 */
const parseErrorLine = (stderr) => {
  const match = stderr.match(/:(\d+):/);
  return match ? parseInt(match[1], 10) : null;
};

export { executeCpp };
