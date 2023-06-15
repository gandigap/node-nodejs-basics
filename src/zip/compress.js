import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { getDirname } from '../utils/get-dirname.js';
import { createGzip } from 'zlib';

const __dirname = getDirname(import.meta.url);
const fileToCompressPath = join(__dirname, 'files', 'fileToCompress.txt');
const fileArchivePath = join(__dirname, 'files', 'archive.gz');

const compress = async () => {
    const readStream = createReadStream(fileToCompressPath);
    const writeStream = createWriteStream(fileArchivePath);
    const compressStream = createGzip();

    const handleError = () => {
      console.log('Error');
      readStream.destroy();
      writeStream.end('Finished with error...');
    }
    
    readStream
      .on('error', handleError)
      .pipe(compressStream)
      .pipe(writeStream)
      .on('error', handleError);
};

await compress();