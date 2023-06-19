import { join } from 'path';
import { fork } from 'child_process';
import { getDirname } from '../utils/get-dirname.js';

const __dirname = getDirname(import.meta.url);
const scriptPath = join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const childProcess = fork(scriptPath, args, { silent: true });

    const handleError = () => {
        console.log('Error');
        readStream.destroy();
        writeStream.end('Finished with error...');
    }

    process.stdin
        .on('error', handleError)
        .pipe(childProcess.stdin);

    childProcess.stdout
        .on('error', handleError)
        .pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess( ['someArgument1', 'someArgument2'] );
