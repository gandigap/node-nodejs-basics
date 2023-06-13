import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fresh.txt');
const fileContent = 'I am fresh and young';

const create = async () => {
  try {
    await fs.access(filePath);
    throw new Error(ERROR_MESSAGES.fsFailed);
  } catch (error) {
    if (error.code !== ERROR_CODES.eoent) {
      throw error;
    }
  }  

  await fs.writeFile(filePath, fileContent);
};

await create();