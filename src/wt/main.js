import { join } from 'path';
import { cpus } from 'os';
import { Worker } from 'worker_threads';
import { getDirname } from '../utils/get-dirname.js';

const __dirname = getDirname(import.meta.url);
const workerPath = join(__dirname, 'worker.js');

const performCalculations = async () => {
    const procesorNumbers = cpus().length; 
    const promises = [];

    for (let i = 0; i < procesorNumbers; i++) {
        promises.push(new Promise((resolve) => {
            const worker = new Worker(workerPath, { workerData: i + 10})

            worker.on('message', (data) => resolve({status: 'resolved', data: data }));
            worker.on('error', () => resolve({status: 'error', data: null }));

        }))
    }

    const results = await Promise.all(promises);
    console.log(results)
};

await performCalculations();