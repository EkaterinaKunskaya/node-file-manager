// GENERAL CONSTANTS
const ARGUMENT_PREFIX_USERNAME = '--username=';

// CONSTANTS FOR getMessage HELPER
const WELCOME = 'WELCOME';
const GOODBYE = 'GOODBYE';
const CURRENT_DIR = 'CURRENT_DIR';
const UNKNOWN_OPERATION = 'UNKNOWN_OPERATION';
const ERROR = 'ERROR';

// CONSTANTS FOR nwd
const LIST_DIRECTORY = 'directory';
const LIST_FILE = 'file';

// CONSTANTS FOR COMMANDS
const NWD = {
    UP: 'up',
    TO_DIR: 'cd',
    LIST: 'ls',
};
const FS = {
    READ: 'cat',
    CREATE: 'add',
    RENAME: 'rn',
    COPY: 'cp',
    MOVE: 'mv',
    DELETE: 'rm',
};
const OS = 'os';
const HASH = 'hash';
const ZIP = {
    COMPRESS: 'compress',
    DECOMPRESS: 'decompress',
};


export {
    WELCOME,
    GOODBYE,
    CURRENT_DIR,
    UNKNOWN_OPERATION,
    ERROR,
    ARGUMENT_PREFIX_USERNAME,
    LIST_DIRECTORY,
    LIST_FILE,
    NWD,
    FS,
    OS,
    HASH,
    ZIP,
};