import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';

export const hash = async (filePath) => {
    const fileStream = createReadStream(resolve(process.cwd(), filePath));
	const hash = createHash('SHA256').setEncoding('hex');

	fileStream.pipe(hash);
	fileStream.on('end', () => {
		hash.end();
		console.log(hash.read());
	});
};