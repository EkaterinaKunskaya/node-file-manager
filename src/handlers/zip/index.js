
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { parse, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
// HELPERS
import { isExist } from '../../helpers/isExist.js';

const compress = async (filePath, destinationPath) => {
    const sourcePath = resolve(process.cwd(), filePath);
    const { dir: directory, name: fileName, ext: fileExtension } = parse(sourcePath);

    isExist(sourcePath);
    const brotliCompress = createBrotliCompress();
    const source = createReadStream(sourcePath);
    const destination = createWriteStream(resolve(process.cwd(), destinationPath || directory, `${fileName}${fileExtension}.br`));

    await pipeline(source, brotliCompress, destination);
};

const decompress = async (filePath, destinationPath) => {
    const sourcePath = resolve(process.cwd(), filePath);
    const { dir: directory, name: fileName } = parse(sourcePath);

    isExist(sourcePath);
    const brotliDecompress = createBrotliDecompress();
    const source = createReadStream(sourcePath);
    const destination = createWriteStream(resolve(process.cwd(), destinationPath || directory, fileName));

    await pipeline(source, brotliDecompress, destination);
};

export default { compress, decompress };