import { access, readdir } from 'fs/promises';
import { join} from 'path';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors.js';
import { getDirname } from '../utils/get-dirname.js';

const __dirname = getDirname(import.meta.url);
const initFolderPath = join(__dirname, 'files');

const list = async () => {
   try {

        const isInitFolderExist =  await access(initFolderPath)
                                        .then(() => true)
                                        .catch(() => false);
        if (!isInitFolderExist) {
            throw new Error(ERROR_MESSAGES.fsFailed);
        }
        const files = await readdir(initFolderPath);

        for (const file of files) {
            console.log(file);
        }
   } catch (error) {    
        if (error.code !== ERROR_CODES.eoent) {
            throw error;
        }
   }
};

await list();