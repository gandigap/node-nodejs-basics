import { access, writeFile } from 'fs/promises';
import { join } from 'path';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors.js';
import { getDirname } from '../utils/get-dirname.js';

const __dirname = getDirname(import.meta.url);
const filePath = join(__dirname, 'files', 'fresh.txt');
const fileContent = 'I am fresh and young';

const create = async () => {
  try {
    await access(filePath);
    throw new Error(ERROR_MESSAGES.fsFailed);
  } catch (error) {
    if (error.code !== ERROR_CODES.eoent) {
      throw error;
    }
  }  

  await writeFile(filePath, fileContent);
};

await create();