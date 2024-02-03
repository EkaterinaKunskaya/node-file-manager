import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';
// HELPERS
import { isExist } from '../../helpers/isExist.js';

export const hash = async (filePath) => {
	const sourcePath = resolve(process.cwd(), filePath);
    isExist(sourcePath);

    const fileStream = createReadStream(sourcePath);
	const hash = createHash('SHA256').setEncoding('hex');

	fileStream.pipe(hash);
	fileStream.on('end', () => {
		hash.end();
		console.log(hash.read());
	});
};