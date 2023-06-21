import {createReadStream} from 'fs';
import { join } from 'path';
import { getDirname } from '../utils/get-dirname.js';

const __dirname = getDirname(import.meta.url);
const fileToReadPath = join(__dirname, 'files', 'fileToRead.txt');

import fs from 'fs';

const read = async () => {
    const readStream = createReadStream(fileToReadPath);

    const handleError = () => {
      console.log('Error');
      readStream.destroy();
    }
    
    readStream
      .on('error', handleError)
      .pipe(process.stdout);

};

await read();