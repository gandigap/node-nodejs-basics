import { createWriteStream } from 'fs';
import { join } from 'path';
import { getDirname } from '../utils/get-dirname.js';
import { stdin, stdout } from 'process';

const __dirname = getDirname(import.meta.url);
const fileToWritePath = join(__dirname, 'files', 'fileToWrite.txt');

import fs from 'fs';

const write = async () => {
  let writer = createWriteStream(fileToWritePath);
  stdout.write('Enter text to save in a file and press Ctrl + C to exit\n');
  stdin.on('data', data => {
    writer.write(data);
  });
  process.on('SIGINT', () => {
    process.exit();
  });
};

await write();