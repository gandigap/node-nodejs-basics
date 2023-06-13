import fs from 'fs/promises';
import {constants} from 'fs';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const initFolder = 'files';
const copyFolder = 'files_copy';

const initFolderPath = join(__dirname, initFolder);
const copyFolderPath = join(__dirname, copyFolder);

const copy = async () => {
    try {
        const isSourceFolderExist =  await fs.access(initFolderPath)
                                        .then(() => true)
                                        .catch(() => false);
        if (!isSourceFolderExist) {
            throw new Error(ERROR_MESSAGES.fsFailed);
        }

        await fs.cp(
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
