import { access, cp } from 'fs/promises';
import { join} from 'path';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors.js';
import { getDirname } from '../utils/get-dirname.js';

const __dirname = getDirname(import.meta.url);
const initFolderPath = join(__dirname, 'files');
const copyFolderPath = join(__dirname, 'files_copy');

const copy = async () => {
    try {
        const isInitFolderExist =  await access(initFolderPath)
                                        .then(() => true)
                                        .catch(() => false);
        if (!isInitFolderExist) {
            throw new Error(ERROR_MESSAGES.fsFailed);
        }

        await cp(
            initFolderPath,
            copyFolderPath,
            { recursive: true, force: false, errorOnExist: true }                
        );
    } catch (error) {
        if (error.code === ERROR_CODES.cpExist) {
            throw new Error(ERROR_MESSAGES.fsFailed);
        }
       
        if (error.code !== ERROR_CODES.eoent) {
            throw error;
        }  
    }
};

await copy();
