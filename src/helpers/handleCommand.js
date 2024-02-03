// CONSTANTS
import {
    CURRENT_DIR,
    UNKNOWN_OPERATION,
    ERROR,
    NWD,
    FS,
    OS,
    HASH,
    ZIP,
} from '../constants/constants.js';
// HELPERS
import { getMessage } from '../helpers/getMessage.js';
// HANDLERS
import nwd from '../handlers/nwd/index.js';
import fs from '../handlers/fs/index.js';
import { os } from '../handlers/os/index.js';
import { hash } from '../handlers/hash/index.js';
import zip from '../handlers/zip/index.js';

export const handleCommand = async (fullCommand) => {
    const [command, ...rowArgs] = fullCommand.trim().split(' ');
    const args = rowArgs.filter(Boolean);

    try {
        switch (command) {
            // Navigation & working directory (nwd)
            case NWD.UP:
                await nwd.up();
                break;
            case NWD.TO_DIR:
                await nwd.cd(...args);
                break;
            case NWD.LIST:
                await nwd.ls();
                break;
            // Basic operations with files
            case FS.READ:
                await fs.cat(...args);
                break;
            case FS.CREATE:
                await fs.add(...args);
                break;
            case FS.RENAME:
                await fs.rn(...args);
                break;
            case FS.COPY:
                await fs.cp(...args);
                break;
            case FS.MOVE:
                await fs.mv(...args);
                break;
            case FS.DELETE:
                await fs.rm(...args);
                break;
            // Operating system info
            case OS:
                await os(...args);
                break;
            // Hash calculation
            case HASH:
                await hash(...args);
                break;
            // Compress and decompress operations
            case ZIP.COMPRESS:
                await zip.compress(...args);
                break;
            case ZIP.DECOMPRESS:
                await zip.decompress(...args);
                break;
            // Finish program
            case '.exit':
                process.exit();
            default:
                getMessage(UNKNOWN_OPERATION);
        }

        getMessage(CURRENT_DIR, process.cwd());
    } catch (error) {
        getMessage(ERROR);
    };
}