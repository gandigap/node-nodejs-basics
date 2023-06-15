import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { getDirname } from '../utils/get-dirname.js';
import { pipeline } from "stream/promises";

const __dirname = getDirname(import.meta.url);
const fileToReadPath = join(__dirname, 'files', 'fileToRead.txt');
const fileToWritePath = join(__dirname, 'files', 'fileToWrite.txt');

import fs from 'fs';

const write = async () => {
    const readStream = createReadStream(fileToReadPath);
    const writeStream = createWriteStream(fileToWritePath);

    const handleError = () => {
      console.log('Error');
      readStream.destroy();
      writeStream.end('Finished with error...')
    }
    
    readStream
      .on('error', handleError)
      .pipe(writeStream)
      .on('error', handleError);
};

await write();