import {createReadStream} from 'fs';
import readline from "readline";
import events from "events";
import { join} from 'path';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors.js';
import { getDirname } from '../utils/get-dirname.js';

const __dirname = getDirname(import.meta.url);
const fileToReadPath = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    try {
        const readLine = readline.createInterface({
            input: createReadStream(fileToReadPath)
        });

        readLine.on('line', line => console.log(line));

        await events.once(readLine, 'close');
    } catch (error) {
        if (error.code === ERROR_CODES.eoent) {
            throw new Error('FS operation failed');
        }
    }
};

await read();