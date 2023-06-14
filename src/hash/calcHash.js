import { readFile } from 'fs/promises';
import { createHash } from 'crypto';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { getDirname } from '../utils/get-dirname.js';

const __dirname = getDirname(import.meta.url);
const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const fileContent = await readFile(filePath);

    const hash = createHash('sha256');
    hash.update(fileContent);
    const hashHex = hash.digest('hex');

    console.log(hashHex);
};

await calculateHash();