import { createReadStream, createWriteStream } from 'node:fs';
import { writeFile, rename, unlink } from 'node:fs/promises';
import { resolve, basename, parse } from 'node:path';
import { finished, pipeline } from 'node:stream/promises';
// HELPERS
import { getMessage } from '../../helpers/getMessage.js';

const cat = async (filePath) => {
    const fileReadableStream = createReadStream(resolve(process.cwd(), filePath));
	fileReadableStream.pipe(process.stdout);
    await finished(fileReadableStream);
};

const add = async (newFileName) => {
    try {
        await writeFile(resolve(process.cwd(), newFileName), '', { flag: 'wx' });
    } catch (error) {
        console.error(error.message);
    }
};

const rn = async (filePath, newFileName) => {
    try {
        await rename(resolve(process.cwd(), filePath), resolve(process.cwd(), newFileName));
    } catch (error) {
        console.error(error.message);
    }
};

const cp = async (filePath, newDirectoryPath) => {
    const sourcePath = resolve(process.cwd(), filePath);
    const { dir: directory, name: fileName, ext: fileExtension } = parse(sourcePath);

    try {
        const fileReadableStream = createReadStream(sourcePath);
        const fileWritableStream = createWriteStream(resolve(process.cwd(), newDirectoryPath || directory, `${fileName}_copy${fileExtension}`));
    
        await pipeline (
            fileReadableStream,
            fileWritableStream,
        )
    } catch(error) {
        console.log(error)
        getMessage();
    }

};

const rm = async (filePath) => {
    // TODO valid to exist
    try {
        await unlink(resolve(process.cwd(), filePath));
    } catch (error) {
        console.error(error.message);
    }
};

const mv = async (filePath, newDirectoryPath) => {
    const fileName = basename(resolve(process.cwd(), filePath));
    
    try {
        const fileReadableStream = createReadStream(resolve(process.cwd(), filePath));
        const fileWritableStream = createWriteStream(resolve(process.cwd(), newDirectoryPath, fileName));
    
        await pipeline (
            fileReadableStream,
            fileWritableStream,
        )

        await rm(filePath);
    } catch (error) {
        getMessage();
    }
};

export default { cat, add, rn, cp, mv, rm };