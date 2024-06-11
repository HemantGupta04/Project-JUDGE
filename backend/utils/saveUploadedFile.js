import fs from 'fs';
import path from 'path';

export const saveUploadedFile = async (file, questionTitle, type) => {
    try {
        const uploadsDir = path.join('backend', 'uploads');
        const questionDir = path.join(uploadsDir, questionTitle);

        // Create the question directory if it doesn't exist
        if (!fs.existsSync(questionDir)) {
            fs.mkdirSync(questionDir, { recursive: true });
        }

        const fileTypeDir = path.join(questionDir, type);
        // Create the input/output directory if it doesn't exist
        if (!fs.existsSync(fileTypeDir)) {
            fs.mkdirSync(fileTypeDir, { recursive: true });
        }

        const filePath = path.join(fileTypeDir, `${questionTitle}_${type}.txt`);
        await fs.promises.writeFile(filePath, file.buffer);
        return filePath;  // Return the correct file path
    } catch (error) {
        console.error('Failed to save file:', error);
        throw error;
    }
};
