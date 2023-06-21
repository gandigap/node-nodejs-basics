import { Transform } from 'stream';

const transform = async () => {
    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk
                .toString()
                .split('')
                .reverse()
                .join('') + '\n');
            callback();
        }
    });

    const handleError = () => {
        console.log('Error');
        transformStream.destroy();
      }

    process.stdin
    .on('error', handleError)
    .pipe(transformStream).pipe(process.stdout);
};

await transform();