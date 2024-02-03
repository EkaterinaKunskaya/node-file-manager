import { WELCOME, GOODBYE, CURRENT_DIR, UNKNOWN_OPERATION, ERROR, NO_FILE } from '../constants/constants.js';

export const getMessage = (type, arg) => {
    switch (type) {
        case WELCOME:
            console.log(`Welcome to the File Manager, ${arg}!`);
            break;
        case GOODBYE:
            console.log(`Thank you for using File Manager, ${arg}, goodbye!`);
            break;
        case CURRENT_DIR:
            console.log(`You are currently in ${arg}`);
            break;
        case UNKNOWN_OPERATION:
            console.log('Invalid input');
            break;
        case ERROR:
            console.log('Operation failed');
            break;
        case NO_FILE:
            console.log('File don\'t exist');
            break;
        default:
            console.log('Oops, something went wrong');
            console.log(arg);
    }
}