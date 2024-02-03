
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream, existsSync } from 'node:fs';
import { parse, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';

const compress = async (filePath, destinationPath) => {
    const sourcePath = resolve(process.cwd(), filePath);
    const { dir: directory, name: fileName, ext: fileExtension } = parse(sourcePath);

    const brotliCompress = createBrotliCompress();
	const source = createReadStream(sourcePath);
	const destination = createWriteStream(resolve(process.cwd(), destinationPath || directory, `${fileName}${fileExtension}.br`));

	await pipeline(source, brotliCompress, destination);
};

const decompress = async (filePath, destinationPath) => {
    const sourcePath = resolve(process.cwd(), filePath);
    const { dir: directory, name: fileName } = parse(sourcePath);

    if (existsSync(sourcePath)) {
        const brotliDecompress = createBrotliDecompress();
        const source = createReadStream(sourcePath);
        const destination = createWriteStream(resolve(process.cwd(), destinationPath || directory, fileName));
    
        await pipeline(source, brotliDecompress, destination);
    } else {
        throw new Error('File don\'t exist');
    }
};

export default { compress, decompress };