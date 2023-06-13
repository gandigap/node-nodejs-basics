import { unlink, access } from 'fs/promises';
import { join } from 'path';
import { getDirname } from '../utils/get-dirname.js';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors.js';

const __dirname = getDirname(import.meta.url);
const fileToRemove = join(__dirname, 'files', 'fileToRemove.txt');

const remove = async () => {
   try {
        const isFileToRemoveExist =  await access(fileToRemove)
                                            .then(() => true)
                                            .catch(() => false);

        if (!isFileToRemoveExist) {
            throw new Error(ERROR_MESSAGES.fsFailed);
        }

        await unlink(fileToRemove);
   } catch (error) {
        if (error.code !== ERROR_CODES.eoent) {
            throw error;
        }
   }
};

await remove();