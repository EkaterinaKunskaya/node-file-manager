import { EOL, arch, cpus, homedir, userInfo } from 'node:os';
// CONSTANTS
import { UNKNOWN_OPERATION } from '../../constants/constants.js';
// HELPERS
import { getMessage } from '../../helpers/getMessage.js';

export const os = async (arg) => {
    switch (arg) {
        case '--EOL':
            console.log(JSON.stringify(EOL));
            break;
        case '--cpus':
            const cpusInfo = cpus().map((cpu, index) => {
                return {
                    Model: cpu.model,
                    Speed: `${cpu.speed/1000} GHz`,
                };
            });
            console.log(`Total: ${cpusInfo.length}`);
            console.table(cpusInfo);
            break;
        case '--homedir':
            console.log(homedir());
            break;
        case '--username':
            console.log(userInfo().username);
            break;
        case '--architecture':
            console.log(arch());
            break;
        default:
            getMessage(UNKNOWN_OPERATION);
    }
};