import { existsSync } from 'node:fs';
import { NO_FILE } from '../constants/constants.js';
import { getMessage } from './getMessage.js';

export const isExist = (path) => {
    if (!existsSync(path)) {
        getMessage(NO_FILE);
        throw new Error(NO_FILE);
    }
};