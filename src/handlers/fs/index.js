import { createReadStream, createWriteStream } from 'node:fs';
import { writeFile, rename, unlink } from 'node:fs/promises';
import { resolve, basename, parse } from 'node:path';
import { finished, pipeline } from 'node:stream/promises';
// HELPERS
import { isExist } from '../../helpers/isExist.js';

const cat = async (filePath) => {
    const sourcePath = resolve(process.cwd(), filePath);
    isExist(sourcePath);
    const fileReadableStream = createReadStream(sourcePath);
	fileReadableStream.pipe(process.stdout);
    await finished(fileReadableStream);
};

const add = async (newFileName) => {
    try {
        await writeFile(resolve(process.cwd(), newFileName), '', { flag: 'wx' });
    } catch (error) {
        throw new Error(error);
    }
};

const rn = async (filePath, newFileName) => {
    const sourceFilePath = resolve(process.cwd(), filePath);
    isExist(sourceFilePath);

    try {
        await rename(sourceFilePath, resolve(process.cwd(), newFileName));
    } catch (error) {
        throw new Error(error);
    }
};

const cp = async (filePath, newDirectoryPath) => {
    const sourcePath = resolve(process.cwd(), filePath);
    const { dir: directory, name: fileName, ext: fileExtension } = parse(sourcePath);
    isExist(sourcePath);

    try {
        const fileReadableStream = createReadStream(sourcePath);
        const fileWritableStream = createWriteStream(resolve(process.cwd(), newDirectoryPath || directory, `${fileName}_copy${fileExtension}`));
    
        await pipeline (
            fileReadableStream,
            fileWritableStream,
        )
    } catch(error) {
        throw new Error(error);
    }

};

const rm = async (filePath) => {
    const sourceFilePath = resolve(process.cwd(), filePath);
    isExist(sourceFilePath);

    try {
        await unlink(sourceFilePath);
    } catch (error) {
        throw new Error(error);
    }
};

const mv = async (filePath, newDirectoryPath) => {
    const fileName = basename(resolve(process.cwd(), filePath));
    const sourceFilePath = resolve(process.cwd(), filePath);
    isExist(sourceFilePath);
    
    try {
        const fileReadableStream = createReadStream(sourceFilePath);
        const fileWritableStream = createWriteStream(resolve(process.cwd(), newDirectoryPath, fileName));
    
        await pipeline (fileReadableStream, fileWritableStream)
        await rm(filePath);
    } catch (error) {
        throw new Error(error);
    }
};

export default { cat, add, rn, cp, mv, rm };