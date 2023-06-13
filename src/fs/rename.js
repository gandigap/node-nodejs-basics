import { rename as fileRename, access } from 'fs/promises';
import { join } from 'path';
import { getDirname } from '../utils/get-dirname.js';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors.js';

const __dirname = getDirname(import.meta.url);
const wrongFilenamePath = join(__dirname, 'files', 'wrongFilename.txt');
const properFilenamePath = join(__dirname, 'files', 'properFilename.md');

const rename = async () => {
    try {
        const isWrongFileExist =  await access(wrongFilenamePath)
                                        .then(() => true)
                                        .catch(() => false);

        if (!isWrongFileExist) {
            throw new Error(ERROR_MESSAGES.fsFailed);
        }

        await access(properFilenamePath);
        throw new Error(ERROR_MESSAGES.fsFailed);        
    } catch (error) {              
        if (error.code !== ERROR_CODES.eoent) {
            throw error;
        }
    }

    await fileRename( wrongFilenamePath, properFilenamePath );
};

await rename();