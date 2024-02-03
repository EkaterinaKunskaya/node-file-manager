import { homedir } from 'os';
import { createInterface } from 'readline';
// CONSTANTS
import {
    WELCOME,
    GOODBYE,
    CURRENT_DIR,
    ARGUMENT_PREFIX_USERNAME,
} from './constants/constants.js';
// HELPERS
import { getMessage } from './helpers/getMessage.js';
import { handleCommand } from './helpers/handleCommand.js';


const homeDirectory = homedir();
const currentDirectory = process.cwd();
if (homeDirectory !== currentDirectory) process.chdir(homeDirectory);

const username = process.argv.find(argument => argument.startsWith(ARGUMENT_PREFIX_USERNAME)).replace(ARGUMENT_PREFIX_USERNAME, '');

const readlineInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
});

getMessage(WELCOME, username);
getMessage(CURRENT_DIR, process.cwd());
readlineInterface.on('line', handleCommand);

process.on('exit', () => {
    getMessage(GOODBYE, username);
    readlineInterface.close();
});