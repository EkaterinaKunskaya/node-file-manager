import { EOL, arch, cpus, homedir, userInfo } from 'node:os';
// CONSTANTS
import { UNKNOWN_OPERATION, OS_ARGS } from '../../constants/constants.js';
// HELPERS
import { getMessage } from '../../helpers/getMessage.js';

export const os = async (arg) => {
    switch (arg) {
        case OS_ARGS.EOL:
            console.log(JSON.stringify(EOL));
            break;
        case OS_ARGS.CPUS:
            const cpusInfo = cpus().map(cpu => {
                return {
                    Model: cpu.model,
                    Speed: `${cpu.speed/1000} GHz`,
                };
            });
            console.log(`Total: ${cpusInfo.length}`);
            console.table(cpusInfo);
            break;
        case OS_ARGS.HOMEDIR:
            console.log(homedir());
            break;
        case OS_ARGS.USERNAME:
            console.log(userInfo().username);
            break;
        case OS_ARGS.ARCH:
            console.log(arch());
            break;
        default:
            getMessage(UNKNOWN_OPERATION);
    }
};