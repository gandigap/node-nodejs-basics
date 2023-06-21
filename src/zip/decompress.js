import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { getDirname } from '../utils/get-dirname.js';
import { createGunzip } from 'zlib';

const __dirname = getDirname(import.meta.url);

const fileArchivePath = join(__dirname, 'files', 'archive.gz');
const fileToCompressPath = join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {
    const readStream = createReadStream(fileArchivePath);
    const writeStream = createWriteStream(fileToCompressPath);
    const decompressStream = createGunzip();

    const handleError = () => {
      console.log('Error');
      readStream.destroy();
      writeStream.end('Finished with error...');
    }
    
    readStream
      .on('error', handleError)
      .pipe(decompressStream)
      .pipe(writeStream)
      .on('error', handleError);
};

await decompress();