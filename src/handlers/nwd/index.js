import { resolve } from 'node:path';
import { readdir } from 'node:fs/promises';
// CONSTANTS
import { LIST_DIRECTORY, LIST_FILE, UNKNOWN_OPERATION } from '../../constants/constants.js';


const up = async () => {
    process.chdir(resolve(process.cwd(), '..'));
};

const cd = async (path) => {
    const destinationPath = resolve(process.cwd(), path);
    await process.chdir(destinationPath);
};

const ls = async () => {
    const dirents = await readdir(process.cwd(), { withFileTypes: true });

    const folderInfo = dirents
        .map((dirent) => {
            return {
                Name: dirent.name,
                Type: dirent.isFile() ? LIST_FILE : LIST_DIRECTORY,
            };
        })
        .sort((a, b) => a.Type.localeCompare(b.Type) || a.Name.localeCompare(b.Name));

    console.table(folderInfo);
};

export default { ls, cd, up };